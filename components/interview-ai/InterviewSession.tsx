"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowLeft,
  BrainCircuit,
  Clock3,
  MessageSquare,
  Mic2,
  Pause,
  Play,
  RotateCcw,
  Send,
  Sparkles,
} from "lucide-react";
import { MetricTile, PremiumCard, ProductShell, ProgressBar, fadeUp } from "./shared";
import { useInterviewAIStore } from "@/store/interview-ai-store";

const questions = [
  {
    prompt:
      "Design the collaboration model for a code review product that supports offline drafts, realtime comments, and enterprise permissions.",
    ai: "You mentioned optimistic updates. Now explain how you would reconcile conflicts when two reviewers submit comments against different file revisions.",
    transcript:
      "I would model comments as immutable events tied to file revision IDs, then create a resolution layer that maps stale comments to the nearest surviving line range.",
    followUps: [
      "How would this scale to 100k active reviewers?",
      "What permissions data would you cache?",
      "What metric proves the design is healthy?",
    ],
  },
  {
    prompt:
      "Tell me about a time you disagreed with a product decision and still helped the team move forward.",
    ai: "Good. Make the impact measurable. What changed because of your approach?",
    transcript:
      "I would first align on the user problem, then propose a smaller experiment so the team could validate risk without blocking the roadmap.",
    followUps: [
      "What was your exact ownership?",
      "How did you handle pushback?",
      "What would you do differently now?",
    ],
  },
  {
    prompt: "Explain how you would debug a frontend performance regression after a release.",
    ai: "Now prioritize your first 30 minutes. Which signals do you inspect first?",
    transcript:
      "I would compare web vitals, release diffs, bundle changes, and API latency before forming a hypothesis about rendering versus data loading.",
    followUps: [
      "How do you separate network and rendering issues?",
      "What goes into the rollback decision?",
      "How would you prevent recurrence?",
    ],
  },
];

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${secs}`;
};

export function InterviewSession() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(true);
  const [seconds, setSeconds] = useState(1456);
  const [transcript, setTranscript] = useState(questions[0].transcript);
  const [feedback, setFeedback] = useState("AI is listening for structure, tradeoffs, and measurable impact.");
  const [progress, setProgress] = useState(6);
  const [confidence, setConfidence] = useState(82);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const {
    session,
    streamedResponse,
    isStarting,
    isEvaluating: backendEvaluating,
    error,
    startInterview,
    submitAnswer: submitAnswerToBackend,
    streamCoachResponse,
    reset: resetBackendSession,
  } = useInterviewAIStore();
  const current = questions[questionIndex];

  useEffect(() => {
    if (!session && !isStarting) {
      void startInterview({ role: "Senior Frontend Engineer", type: "SYSTEM_DESIGN", difficulty: "medium" });
    }
  }, [isStarting, session, startInterview]);

  useEffect(() => {
    if (!isRecording) return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [isRecording]);

  const updateTranscript = (value: string) => {
    setTranscript(value);
    setConfidence(Math.min(96, Math.max(58, 68 + Math.floor(value.length / 18))));
  };

  const submitAnswer = () => {
    setIsEvaluating(true);
    void (async () => {
      const backendFeedback = await submitAnswerToBackend(transcript, seconds);
      if (backendFeedback) {
        setFeedback(backendFeedback.summary);
        setConfidence(Math.round(Object.values(backendFeedback.scores).reduce((sum, value) => sum + value, 0) / 7));
        void streamCoachResponse(transcript);
      }
      const nextIndex = (questionIndex + 1) % questions.length;
      const nextConfidence = Math.min(96, confidence + 3);
      if (!backendFeedback) setConfidence(nextConfidence);
      setProgress((value) => Math.min(10, value + 1));
      if (!backendFeedback) setFeedback(
        nextConfidence >= 88
          ? "Strong answer. You explained tradeoffs clearly and gave a concrete operating metric."
          : "Good structure. Add sharper failure modes, measurable impact, and one explicit tradeoff.",
      );
      setQuestionIndex(nextIndex);
      setTranscript(session?.currentQuestion ? "" : questions[nextIndex].transcript);
      setIsEvaluating(false);
    })();
  };

  const resetSession = () => {
    setQuestionIndex(0);
    setIsRecording(true);
    setSeconds(1456);
    setTranscript(questions[0].transcript);
    setFeedback("AI is listening for structure, tradeoffs, and measurable impact.");
    setProgress(6);
    setConfidence(82);
    resetBackendSession();
    void startInterview({ role: "Senior Frontend Engineer", type: "SYSTEM_DESIGN", difficulty: "medium" });
  };

  return (
    <ProductShell>
      <main className="mx-auto max-w-[1400px] px-4 py-5">
        <div className="mb-5 flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="grid size-10 place-items-center rounded-xl border border-white/10 bg-black/24">
              <ArrowLeft className="size-4" />
            </Link>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">AI Interview Session</h1>
              <p className="text-sm text-slate-500">{session?.role || "Senior Frontend Engineer"} - System Design + Behavioral</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`rounded-full border px-3 py-1 text-xs ${isRecording ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-200" : "border-amber-300/20 bg-amber-300/10 text-amber-200"}`}>
              {isRecording ? "Recording" : "Paused"}
            </div>
            <button onClick={() => setIsRecording((value) => !value)} className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm">
              {isRecording ? <Pause className="size-4" /> : <Play className="size-4" />}
              {isRecording ? "Pause" : "Resume"}
            </button>
            <button onClick={resetSession} className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
              <RotateCcw className="size-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <motion.div variants={fadeUp} initial="hidden" animate="show" className="grid gap-5 md:grid-cols-2">
              <PremiumCard className="p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-xl bg-cyan-300/10"><BrainCircuit className="size-5 text-cyan-200" /></div>
                    <div>
                      <h2 className="font-semibold">AI Interviewer</h2>
                      <p className="text-xs text-slate-500">Adaptive follow-up mode</p>
                    </div>
                  </div>
                  <Sparkles className="size-5 text-violet-200" />
                </div>
                <div className="rounded-xl border border-white/10 bg-black/24 p-4">
                  <p className="text-sm leading-7 text-slate-300">"{current.ai}"</p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-cyan-200">
                  <span className="size-2 animate-pulse rounded-full bg-cyan-300" />
                  {isEvaluating || backendEvaluating ? "AI evaluating response..." : streamedResponse || feedback}
                </div>
              </PremiumCard>

              <PremiumCard className="p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-xl bg-violet-300/10"><MessageSquare className="size-5 text-violet-200" /></div>
                    <div>
                      <h2 className="font-semibold">User Response</h2>
                      <p className="text-xs text-slate-500">Editable live transcript</p>
                    </div>
                  </div>
                  <button onClick={() => setIsRecording((value) => !value)} className={`grid size-10 place-items-center rounded-full text-black shadow-[0_0_28px_rgba(103,232,249,.28)] ${isRecording ? "bg-cyan-300" : "bg-slate-400"}`}>
                    <Mic2 className="size-5" />
                  </button>
                </div>
                <div className="min-h-40 rounded-xl border border-white/10 bg-black/24 p-4">
                  <textarea
                    value={transcript}
                    onChange={(event) => updateTranscript(event.target.value)}
                    className="min-h-32 w-full resize-none bg-transparent text-sm leading-7 text-slate-300 outline-none placeholder:text-slate-600"
                    placeholder="Speak or type your response..."
                  />
                </div>
                <div className="mt-4 flex h-14 items-end gap-1 rounded-xl border border-white/10 bg-black/24 p-3">
                  {Array.from({ length: 28 }).map((_, index) => (
                    <motion.span
                      key={index}
                      animate={isRecording ? { height: [`${18 + (index % 4) * 8}%`, `${52 + (index % 6) * 5}%`, `${20 + (index % 5) * 7}%`] } : { height: "18%" }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: index * 0.035 }}
                      className="w-full rounded-full bg-gradient-to-t from-cyan-400 to-violet-300"
                    />
                  ))}
                </div>
              </PremiumCard>
            </motion.div>

            <PremiumCard className="p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Current Question</h2>
                <div className="flex items-center gap-2 text-sm text-slate-400"><Clock3 className="size-4" /> {formatTime(seconds)}</div>
              </div>
              <p className="text-xl leading-8 text-white">{session?.currentQuestion || current.prompt}</p>
              {error ? <p className="mt-3 rounded-lg border border-rose-300/20 bg-rose-300/10 p-3 text-sm text-rose-100">{error}</p> : null}
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <MetricTile label="Confidence Meter" value={`${confidence}%`} trend={isRecording ? "live voice signal" : "paused"} />
                <MetricTile label="Progress" value={`${progress}/10`} trend="adaptive round" />
                <MetricTile label="Follow-ups" value={`${current.followUps.length}`} trend="click to insert" />
              </div>
            </PremiumCard>
          </div>

          <aside className="space-y-5">
            <PremiumCard className="p-5">
              <h2 className="mb-5 text-lg font-semibold">Interview Progress</h2>
              <div className="space-y-5">
                <ProgressBar label="Problem Framing" value={Math.min(95, confidence + 6)} />
                <ProgressBar label="Architecture Depth" value={Math.max(60, confidence - 4)} tone="violet" />
                <ProgressBar label="Communication" value={Math.min(96, confidence + 2)} tone="emerald" />
                <ProgressBar label="Confidence" value={confidence} tone="blue" />
              </div>
            </PremiumCard>
            <PremiumCard className="p-5">
              <h2 className="mb-4 text-lg font-semibold">AI Follow-up Queue</h2>
              <div className="space-y-3 text-sm text-slate-300">
                {current.followUps.map((question) => (
                  <button key={question} onClick={() => updateTranscript(`${transcript}\n\n${question} `)} className="w-full rounded-xl border border-white/10 bg-black/24 p-3 text-left transition hover:border-cyan-300/30 hover:bg-cyan-300/10">
                    {question}
                  </button>
                ))}
              </div>
            </PremiumCard>
            <PremiumCard className="p-5">
              <h2 className="mb-4 text-lg font-semibold">Response Controls</h2>
              <div className="flex gap-3">
                <button onClick={() => setIsRecording((value) => !value)} className="grid size-12 place-items-center rounded-full bg-cyan-300 text-black"><Mic2 className="size-5" /></button>
                <button onClick={submitAnswer} disabled={isEvaluating || backendEvaluating || isStarting} className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-black disabled:opacity-60">
                  <Send className="size-4" />{isStarting ? "Starting..." : isEvaluating || backendEvaluating ? "Evaluating..." : "Submit answer"}
                </button>
              </div>
            </PremiumCard>
          </aside>
        </div>
      </main>
    </ProductShell>
  );
}
