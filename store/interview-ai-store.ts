import { create } from "zustand";
import type { InterviewFeedback, InterviewSessionState, InterviewType } from "@/lib/ai/types";

type InterviewStore = {
  session: InterviewSessionState | null;
  streamedResponse: string;
  isStarting: boolean;
  isEvaluating: boolean;
  error: string | null;
  startInterview: (input?: {
    role?: string;
    type?: InterviewType;
    difficulty?: string;
    resumeSignals?: string[];
  }) => Promise<InterviewSessionState | null>;
  submitAnswer: (answer: string, responseTimeSeconds: number) => Promise<InterviewFeedback | null>;
  streamCoachResponse: (answer: string) => Promise<void>;
  reset: () => void;
};

async function unwrap<T>(response: Response): Promise<T> {
  const payload = await response.json();
  if (!payload.ok) throw new Error(payload.error?.message || "Request failed");
  return payload.data as T;
}

export const useInterviewAIStore = create<InterviewStore>((set, get) => ({
  session: null,
  streamedResponse: "",
  isStarting: false,
  isEvaluating: false,
  error: null,
  async startInterview(input) {
    set({ isStarting: true, error: null, streamedResponse: "" });
    try {
      const data = await unwrap<{ session: InterviewSessionState }>(
        await fetch("/api/interview/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: input?.role || "Senior Frontend Engineer",
            type: input?.type || "SYSTEM_DESIGN",
            difficulty: input?.difficulty || "medium",
            resumeSignals: input?.resumeSignals,
          }),
        }),
      );
      set({ session: data.session, isStarting: false });
      return data.session;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Failed to start interview", isStarting: false });
      return null;
    }
  },
  async submitAnswer(answer, responseTimeSeconds) {
    const session = get().session;
    if (!session) return null;
    set({ isEvaluating: true, error: null });
    try {
      const data = await unwrap<{ feedback: InterviewFeedback; session: InterviewSessionState }>(
        await fetch("/api/interview/answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: session.id, answer, responseTimeSeconds }),
        }),
      );
      set({ session: data.session, isEvaluating: false });
      return data.feedback;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Failed to evaluate answer", isEvaluating: false });
      return null;
    }
  },
  async streamCoachResponse(answer) {
    const session = get().session;
    if (!session) return;
    set({ streamedResponse: "" });
    const response = await fetch("/api/interview/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: session.role,
        question: session.currentQuestion,
        answer,
      }),
    });
    const reader = response.body?.getReader();
    if (!reader) return;
    const decoder = new TextDecoder();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      set({ streamedResponse: get().streamedResponse + decoder.decode(value) });
    }
  },
  reset() {
    set({ session: null, streamedResponse: "", error: null, isStarting: false, isEvaluating: false });
  },
}));

type CodingStore = {
  results: Array<{ label: string; passed: boolean }>;
  output: string;
  metrics: Record<string, number>;
  isRunning: boolean;
  runCode: (input: { language: string; code: string; sessionId?: string }) => Promise<void>;
};

export const useCodingAIStore = create<CodingStore>((set) => ({
  results: [],
  output: "Ready.",
  metrics: {},
  isRunning: false,
  async runCode(input) {
    set({ isRunning: true, output: "Running tests..." });
    try {
      const data = await unwrap<{
        tests: Array<{ label: string; passed: boolean }>;
        output: string;
        metrics: Record<string, number>;
      }>(
        await fetch("/api/coding/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        }),
      );
      set({ results: data.tests, output: data.output, metrics: data.metrics, isRunning: false });
    } catch (error) {
      set({
        output: error instanceof Error ? error.message : "Code execution failed",
        isRunning: false,
      });
    }
  },
}));

type AnalyticsStore = {
  analytics: any;
  isLoading: boolean;
  loadAnalytics: () => Promise<void>;
};

export const useAnalyticsAIStore = create<AnalyticsStore>((set) => ({
  analytics: null,
  isLoading: false,
  async loadAnalytics() {
    set({ isLoading: true });
    try {
      const data = await unwrap<{ analytics: any }>(await fetch("/api/analytics"));
      set({ analytics: data.analytics, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
