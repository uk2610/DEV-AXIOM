export type InterviewType = "TECHNICAL" | "BEHAVIORAL" | "SYSTEM_DESIGN" | "CODING";

export type InterviewScores = {
  technicalDepth: number;
  clarity: number;
  confidence: number;
  communication: number;
  optimization: number;
  correctness: number;
  scalability: number;
};

export type InterviewFeedback = {
  scores: InterviewScores;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  roadmap: string[];
  followUpQuestion: string;
  summary: string;
};

export type InterviewSessionState = {
  id: string;
  userId: string;
  role: string;
  type: InterviewType;
  difficulty: string;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED";
  currentQuestion: string;
  score: number;
  startedAt: string;
  turns: Array<{
    question: string;
    answer?: string;
    feedback?: InterviewFeedback;
  }>;
};

export type ApiResponse<T> =
  | { ok: true; data: T; requestId: string }
  | { ok: false; error: { code: string; message: string }; requestId: string };
