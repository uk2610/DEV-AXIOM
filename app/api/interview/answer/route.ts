import { z } from "zod";
import { getCurrentUser } from "@/lib/ai/auth";
import { ApiError, handleApiError, jsonResponse, parseJson, rateLimit } from "@/lib/ai/api";
import { evaluateAnswer } from "@/lib/ai/openai";
import { getInterviewSession, saveAnswer } from "@/lib/ai/repository";

const schema = z.object({
  sessionId: z.string().min(8),
  answer: z.string().min(10),
  responseTimeSeconds: z.number().int().min(0).default(0),
});

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    rateLimit(`interview:answer:${user.id}`, 30);
    const input = await parseJson(request, schema);
    const session = await getInterviewSession(input.sessionId);
    if (!session) throw new ApiError("SESSION_NOT_FOUND", "Interview session not found.", 404);

    const feedback = await evaluateAnswer({
      question: session.currentQuestion,
      answer: input.answer,
      role: session.role,
    });
    const nextSession = await saveAnswer({
      session,
      answer: input.answer,
      feedback,
      responseTimeSeconds: input.responseTimeSeconds ?? 0,
    });
    return jsonResponse({ feedback, session: nextSession });
  } catch (error) {
    return handleApiError(error);
  }
}
