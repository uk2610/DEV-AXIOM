import { eq, desc } from "drizzle-orm";
import type { InterviewFeedback, InterviewSessionState, InterviewType } from "./types";

const memory = {
  sessions: new Map<string, InterviewSessionState>(),
  codingResults: [] as Array<Record<string, unknown>>,
  resumes: [] as Array<Record<string, unknown>>,
};

async function getDb() {
  if (!process.env.DATABASE_URL) return null;
  try {
    const [{ db }, schema] = await Promise.all([
      import("@/db/drizzle"),
      import("@/db/schema/interview-ai-schema"),
    ]);
    return { db, schema };
  } catch (error) {
    console.warn("Database unavailable; using in-memory AI repository.", error);
    return null;
  }
}

export async function createInterviewSession(input: {
  userId: string;
  role: string;
  type: InterviewType;
  difficulty: string;
  question: string;
}) {
  const database = await getDb();
  if (database) {
    try {
      const [session] = await database.db
        .insert(database.schema.interviewSessions)
        .values({
          userId: input.userId,
          role: input.role,
          type: input.type,
          difficulty: input.difficulty,
          currentQuestion: input.question,
          metadata: { source: "ai-orchestrator" },
        })
        .returning();
      await database.db.insert(database.schema.questions).values({
        sessionId: session.id,
        prompt: input.question,
        category: input.type,
        difficulty: input.difficulty,
        expectedSignals: ["structure", "tradeoffs", "correctness", "communication"],
      });
      return {
        id: session.id,
        userId: input.userId,
        role: input.role,
        type: input.type,
        difficulty: input.difficulty,
        status: "ACTIVE" as const,
        currentQuestion: input.question,
        score: 0,
        startedAt: session.startedAt.toISOString(),
        turns: [{ question: input.question }],
      };
    } catch (error) {
      console.warn("Database session create failed; using in-memory interview session.", error);
    }
  }

  const session: InterviewSessionState = {
    id: crypto.randomUUID(),
    userId: input.userId,
    role: input.role,
    type: input.type,
    difficulty: input.difficulty,
    status: "ACTIVE",
    currentQuestion: input.question,
    score: 0,
    startedAt: new Date().toISOString(),
    turns: [{ question: input.question }],
  };
  memory.sessions.set(session.id, session);
  return session;
}

export async function getInterviewSession(id: string) {
  const inMemory = memory.sessions.get(id);
  if (inMemory) return inMemory;

  const database = await getDb();
  if (!database) return null;
  try {
    const [session] = await database.db
      .select()
      .from(database.schema.interviewSessions)
      .where(eq(database.schema.interviewSessions.id, id))
      .limit(1);
    if (!session) return null;
    return {
      id: session.id,
      userId: session.userId || "demo-user",
      role: session.role,
      type: session.type,
      difficulty: session.difficulty,
      status: session.status,
      currentQuestion: session.currentQuestion || "",
      score: session.score,
      startedAt: session.startedAt.toISOString(),
      turns: [{ question: session.currentQuestion || "" }],
    } satisfies InterviewSessionState;
  } catch (error) {
    console.warn("Database session lookup failed; checking in-memory session cache.", error);
    return inMemory;
  }
}

export async function saveAnswer(input: {
  session: InterviewSessionState;
  answer: string;
  feedback: InterviewFeedback;
  responseTimeSeconds: number;
}) {
  const scoreValues = Object.values(input.feedback.scores);
  const score = Math.round(scoreValues.reduce((sum, value) => sum + value, 0) / scoreValues.length);
  const nextSession: InterviewSessionState = {
    ...input.session,
    score,
    currentQuestion: input.feedback.followUpQuestion,
    turns: [
      ...input.session.turns.slice(0, -1),
      {
        question: input.session.currentQuestion,
        answer: input.answer,
        feedback: input.feedback,
      },
      { question: input.feedback.followUpQuestion },
    ],
  };
  memory.sessions.set(input.session.id, nextSession);

  const database = await getDb();
  if (database) {
    try {
      const [question] = await database.db
        .select()
        .from(database.schema.questions)
        .where(eq(database.schema.questions.sessionId, input.session.id))
        .orderBy(desc(database.schema.questions.createdAt))
        .limit(1);
      const [answerRow] = await database.db
        .insert(database.schema.answers)
        .values({
          sessionId: input.session.id,
          questionId: question?.id,
          transcript: input.answer,
          responseTimeSeconds: input.responseTimeSeconds,
        })
        .returning();
      await database.db.insert(database.schema.feedback).values({
        sessionId: input.session.id,
        answerId: answerRow.id,
        ...input.feedback,
      });
      await database.db.insert(database.schema.questions).values({
        sessionId: input.session.id,
        prompt: input.feedback.followUpQuestion,
        category: input.session.type,
        difficulty: input.session.difficulty,
        expectedSignals: ["depth", "clarity", "scalability"],
      });
      await database.db
        .update(database.schema.interviewSessions)
        .set({
          score,
          currentQuestion: input.feedback.followUpQuestion,
          updatedAt: new Date(),
        })
        .where(eq(database.schema.interviewSessions.id, input.session.id));
    } catch (error) {
      console.warn("Database answer save failed; keeping in-memory interview session.", error);
    }
  }

  return nextSession;
}

export async function listInterviewHistory(userId: string) {
  const database = await getDb();
  if (database) {
    try {
      return await database.db
        .select()
        .from(database.schema.interviewSessions)
        .where(eq(database.schema.interviewSessions.userId, userId))
        .orderBy(desc(database.schema.interviewSessions.createdAt))
        .limit(20);
    } catch (error) {
      console.warn("Database history query failed; returning in-memory sessions.", error);
    }
  }
  return Array.from(memory.sessions.values()).filter((session) => session.userId === userId);
}

export async function saveCodingResult(result: Record<string, unknown>) {
  memory.codingResults.unshift(result);
  const database = await getDb();
  if (database) {
    try {
      await database.db.insert(database.schema.codingResults).values({
        userId: String(result.userId || "demo-user"),
        sessionId: result.sessionId ? String(result.sessionId) : undefined,
        language: String(result.language),
        code: String(result.code),
        testsPassed: Number(result.testsPassed || 0),
        testsTotal: Number(result.testsTotal || 0),
        output: String(result.output || ""),
        metrics: (result.metrics || {}) as Record<string, number>,
      });
    } catch (error) {
      console.warn("Database coding result save failed; using in-memory cache.", error);
    }
  }
}

export async function saveResume(result: Record<string, unknown>) {
  memory.resumes.unshift(result);
  const database = await getDb();
  if (database) {
    try {
      await database.db.insert(database.schema.resumes).values({
        userId: String(result.userId || "demo-user"),
        fileName: String(result.fileName),
        rawText: String(result.rawText),
        skills: (result.skills || []) as string[],
        weakAreas: (result.weakAreas || []) as string[],
        generatedQuestions: (result.generatedQuestions || []) as string[],
      });
    } catch (error) {
      console.warn("Database resume save failed; using in-memory cache.", error);
    }
  }
}

export async function getAnalytics(userId: string) {
  const history = await listInterviewHistory(userId);
  const scores = history.map((item: any) => Number(item.score || 0)).filter(Boolean);
  const readinessScore = scores.length
    ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length)
    : 84;
  return {
    readinessScore,
    streak: Math.max(1, Math.min(31, history.length || 18)),
    weakTopics: ["Distributed systems", "Async JavaScript", "Testing discipline"],
    trends: {
      communication: [68, 72, 76, 81, 86, 91],
      coding: [58, 63, 70, 75, 82, 86],
      technical: [62, 67, 73, 79, 84, readinessScore],
    },
    recentSessions: history.slice(0, 8),
  };
}
