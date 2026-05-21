import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const interviewStatusEnum = pgEnum("interview_status", [
  "ACTIVE",
  "COMPLETED",
  "CANCELLED",
]);

export const interviewTypeEnum = pgEnum("interview_type", [
  "TECHNICAL",
  "BEHAVIORAL",
  "SYSTEM_DESIGN",
  "CODING",
]);

export const interviewSessions = pgTable("interview_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  type: interviewTypeEnum("type").default("TECHNICAL").notNull(),
  difficulty: text("difficulty").default("medium").notNull(),
  status: interviewStatusEnum("status").default("ACTIVE").notNull(),
  currentQuestion: text("current_question"),
  score: integer("score").default(0).notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}).notNull(),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const questions = pgTable("ai_questions", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id").references(() => interviewSessions.id, {
    onDelete: "cascade",
  }),
  prompt: text("prompt").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").default("medium").notNull(),
  expectedSignals: jsonb("expected_signals").$type<string[]>().default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const answers = pgTable("answers", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id").references(() => interviewSessions.id, {
    onDelete: "cascade",
  }),
  questionId: uuid("question_id").references(() => questions.id, {
    onDelete: "set null",
  }),
  transcript: text("transcript").notNull(),
  responseTimeSeconds: integer("response_time_seconds").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const feedback = pgTable("feedback", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id").references(() => interviewSessions.id, {
    onDelete: "cascade",
  }),
  answerId: uuid("answer_id").references(() => answers.id, { onDelete: "cascade" }),
  scores: jsonb("scores")
    .$type<{
      technicalDepth: number;
      clarity: number;
      confidence: number;
      communication: number;
      optimization: number;
      correctness: number;
      scalability: number;
    }>()
    .notNull(),
  strengths: jsonb("strengths").$type<string[]>().default([]).notNull(),
  weaknesses: jsonb("weaknesses").$type<string[]>().default([]).notNull(),
  suggestions: jsonb("suggestions").$type<string[]>().default([]).notNull(),
  roadmap: jsonb("roadmap").$type<string[]>().default([]).notNull(),
  followUpQuestion: text("follow_up_question").notNull(),
  summary: text("summary").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const codingResults = pgTable("coding_results", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  sessionId: uuid("session_id").references(() => interviewSessions.id, {
    onDelete: "set null",
  }),
  language: text("language").notNull(),
  code: text("code").notNull(),
  testsPassed: integer("tests_passed").default(0).notNull(),
  testsTotal: integer("tests_total").default(0).notNull(),
  output: text("output").notNull(),
  metrics: jsonb("metrics").$type<Record<string, number>>().default({}).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const analytics = pgTable("analytics", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  readinessScore: integer("readiness_score").default(0).notNull(),
  streak: integer("streak").default(0).notNull(),
  weakTopics: jsonb("weak_topics").$type<string[]>().default([]).notNull(),
  trends: jsonb("trends").$type<Record<string, number[]>>().default({}).notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const resumes = pgTable("resumes", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  fileName: text("file_name").notNull(),
  rawText: text("raw_text").notNull(),
  skills: jsonb("skills").$type<string[]>().default([]).notNull(),
  weakAreas: jsonb("weak_areas").$type<string[]>().default([]).notNull(),
  generatedQuestions: jsonb("generated_questions").$type<string[]>().default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  plan: text("plan").default("free").notNull(),
  status: text("status").default("active").notNull(),
  currentPeriodEnd: timestamp("current_period_end"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const activityLogs = pgTable("activity_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}).notNull(),
  success: boolean("success").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const InterviewAISchema = {
  interviewSessions,
  questions,
  answers,
  feedback,
  codingResults,
  analytics,
  resumes,
  subscriptions,
  activityLogs,
};
