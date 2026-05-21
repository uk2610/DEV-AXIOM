import type { InterviewFeedback, InterviewType } from "./types";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

type GenerateQuestionInput = {
  role: string;
  type: InterviewType;
  difficulty: string;
  resumeSignals?: string[];
};

const fallbackQuestions: Record<InterviewType, string> = {
  TECHNICAL:
    "Explain how you would design a resilient frontend data fetching layer that handles caching, retries, stale data, and loading states.",
  BEHAVIORAL:
    "Tell me about a time you influenced a technical decision without being the formal owner.",
  SYSTEM_DESIGN:
    "Design a collaborative code review system with realtime comments, offline drafts, permissions, and audit logs.",
  CODING:
    "Implement a debounced search pipeline that cancels stale requests, sorts results, and handles empty input.",
};

const clamp = (value: number) => Math.max(0, Math.min(100, value));

export async function generateInterviewQuestion(input: GenerateQuestionInput) {
  const prompt = `Generate one concise ${input.difficulty} ${input.type} interview question for a ${input.role}. Resume signals: ${(input.resumeSignals || []).join(", ") || "none"}. Return only the question.`;
  const ai = await callOpenAI(prompt, 180);
  return ai || fallbackQuestions[input.type];
}

export async function evaluateAnswer({
  question,
  answer,
  role,
}: {
  question: string;
  answer: string;
  role: string;
}): Promise<InterviewFeedback> {
  const prompt = `Evaluate this interview answer for a ${role}.
Question: ${question}
Answer: ${answer}

Return strict JSON with keys: scores { technicalDepth, clarity, confidence, communication, optimization, correctness, scalability }, strengths array, weaknesses array, suggestions array, roadmap array, followUpQuestion string, summary string. Scores are 0-100.`;

  const ai = await callOpenAI(prompt, 700, true);
  if (ai) {
    try {
      const parsed = JSON.parse(ai) as InterviewFeedback;
      return normalizeFeedback(parsed);
    } catch {
      // fall through to deterministic evaluator
    }
  }
  return heuristicEvaluation(question, answer);
}

export async function streamInterviewResponse({
  question,
  answer,
  role,
}: {
  question: string;
  answer: string;
  role: string;
}) {
  if (!process.env.OPENAI_API_KEY) {
    return new ReadableStream({
      start(controller) {
        const chunks = [
          "I heard a solid structure. ",
          "Your answer is strongest when you explain tradeoffs before implementation details. ",
          `For a ${role}, I would now probe scalability and failure handling. `,
          `Follow-up: ${heuristicEvaluation(question, answer).followUpQuestion}`,
        ];
        let index = 0;
        const timer = setInterval(() => {
          controller.enqueue(new TextEncoder().encode(chunks[index]));
          index += 1;
          if (index >= chunks.length) {
            clearInterval(timer);
            controller.close();
          }
        }, 180);
      },
    });
  }

  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "You are a concise senior technical interviewer. Stream useful, direct coaching.",
        },
        {
          role: "user",
          content: `Role: ${role}\nQuestion: ${question}\nAnswer: ${answer}\nGive feedback and one follow-up.`,
        },
      ],
    }),
  });

  return response.body || new ReadableStream();
}

async function callOpenAI(prompt: string, maxTokens: number, json = false) {
  if (!process.env.OPENAI_API_KEY) return null;
  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.35,
      max_tokens: maxTokens,
      response_format: json ? { type: "json_object" } : undefined,
      messages: [
        { role: "system", content: "You are an expert AI interview coach." },
        { role: "user", content: prompt },
      ],
    }),
  }).catch(() => null);

  if (!response?.ok) return null;
  const data = await response.json().catch(() => null);
  return data?.choices?.[0]?.message?.content?.trim() || null;
}

function heuristicEvaluation(question: string, answer: string): InterviewFeedback {
  const words = answer.trim().split(/\s+/).filter(Boolean).length;
  const hasTradeoff = /tradeoff|latency|scale|cache|consistency|complexity|risk/i.test(answer);
  const hasMetric = /\d|metric|measure|p95|conversion|latency|error rate/i.test(answer);
  const hasStructure = /first|second|then|because|therefore|for example/i.test(answer);
  const base = clamp(48 + Math.min(words, 140) / 2);
  const scores = {
    technicalDepth: clamp(base + (hasTradeoff ? 15 : -4)),
    clarity: clamp(base + (hasStructure ? 12 : -6)),
    confidence: clamp(58 + Math.min(words, 90) / 2),
    communication: clamp(base + (hasStructure ? 10 : 0)),
    optimization: clamp(base + (hasTradeoff ? 12 : -8)),
    correctness: clamp(base + (question.length > 20 ? 5 : 0)),
    scalability: clamp(base + (hasMetric ? 12 : hasTradeoff ? 6 : -8)),
  };

  return normalizeFeedback({
    scores,
    strengths: [
      hasStructure ? "Clear sequencing and answer structure." : "Directly addresses the prompt.",
      hasTradeoff ? "Shows awareness of tradeoffs and system constraints." : "Good starting point for deeper probing.",
    ],
    weaknesses: [
      hasMetric ? "Could add more implementation detail." : "Needs measurable success criteria.",
      hasTradeoff ? "Mention one concrete failure mode." : "Needs sharper tradeoff analysis.",
    ],
    suggestions: [
      "State assumptions before proposing the solution.",
      "Add one failure mode and mitigation.",
      "Close with a measurable success metric.",
    ],
    roadmap: [
      "Practice 2-minute structured architecture answers.",
      "Review caching, consistency, and resilience tradeoffs.",
      "Record one answer and remove vague filler.",
    ],
    followUpQuestion:
      "What is the most likely failure mode in your approach, and how would you detect it in production?",
    summary:
      "Solid foundation. The answer becomes interview-ready when it adds explicit assumptions, concrete metrics, and failure-mode reasoning.",
  });
}

function normalizeFeedback(feedback: InterviewFeedback): InterviewFeedback {
  return {
    scores: {
      technicalDepth: clamp(feedback.scores?.technicalDepth || 70),
      clarity: clamp(feedback.scores?.clarity || 70),
      confidence: clamp(feedback.scores?.confidence || 70),
      communication: clamp(feedback.scores?.communication || 70),
      optimization: clamp(feedback.scores?.optimization || 70),
      correctness: clamp(feedback.scores?.correctness || 70),
      scalability: clamp(feedback.scores?.scalability || 70),
    },
    strengths: feedback.strengths?.slice(0, 4) || [],
    weaknesses: feedback.weaknesses?.slice(0, 4) || [],
    suggestions: feedback.suggestions?.slice(0, 5) || [],
    roadmap: feedback.roadmap?.slice(0, 5) || [],
    followUpQuestion: feedback.followUpQuestion || "Can you go one level deeper on the tradeoff?",
    summary: feedback.summary || "Answer evaluated successfully.",
  };
}
