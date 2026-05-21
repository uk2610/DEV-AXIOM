import { question } from "@/db";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { cache } from "react";
import {
  filterQuestionsByLanguage,
  getSeedPracticeQuestions,
  normalizeLanguageFilter,
} from "@/server/functions/practice-catalog";

let dbBackoffUntil = 0;
const DB_BACKOFF_MS = 30_000;

function shouldSkipDb() {
  return Date.now() < dbBackoffUntil;
}

function markDbFailure() {
  dbBackoffUntil = Date.now() + DB_BACKOFF_MS;
}

function logQuestionDbWarning(message: string) {
  // Keep logs concise in dev; detailed stacks here surface as browser console errors in RSC.
  console.warn(message);
}

export const getQuestionById = cache(async (questionId: string) => {
  if (shouldSkipDb()) {
    return getSeedPracticeQuestions().find((item) => item.id === questionId) || null;
  }

  try {
    const questionData = await db
      .select()
      .from(question)
      .where(eq(question.id, questionId))
      .limit(1);

    if (!questionData || questionData.length === 0) {
      return getSeedPracticeQuestions().find((item) => item.id === questionId) || null;
    }

    return questionData[0];
  } catch (error) {
    markDbFailure();
    logQuestionDbWarning("Question lookup failed. Returning null.");
    return getSeedPracticeQuestions().find((item) => item.id === questionId) || null;
  }
});

export const getQuestionBySlug = cache(async (slug: string) => {
  if (shouldSkipDb()) {
    return getSeedPracticeQuestions().find((item) => item.slug === slug) || null;
  }

  try {
    const questionData = await db
      .select()
      .from(question)
      .where(eq(question.slug, slug))
      .limit(1);

    if (!questionData || questionData.length === 0) {
      return getSeedPracticeQuestions().find((item) => item.slug === slug) || null;
    }

    return questionData[0];
  } catch (error) {
    markDbFailure();
    logQuestionDbWarning("Question-by-slug lookup failed. Returning null.");
    return getSeedPracticeQuestions().find((item) => item.slug === slug) || null;
  }
});

export async function getAllQuestions() {
  const seedQuestions = getSeedPracticeQuestions();

  if (shouldSkipDb()) {
    return seedQuestions;
  }

  try {
    const questions = await db.select().from(question);
    if (questions.length === 0) {
      return seedQuestions;
    }

    const dbSlugs = new Set(questions.map((item) => item.slug));
    const remainingSeedQuestions = seedQuestions.filter(
      (item) => !dbSlugs.has(item.slug),
    );

    return [...questions, ...remainingSeedQuestions];
  } catch (error) {
    markDbFailure();
    logQuestionDbWarning("Questions query failed. Returning seeded list.");
    return seedQuestions;
  }
}

export async function getQuestionsByDifficulty(
  difficulty?: string,
  language?: string,
) {
  try {
    const questions = await getAllQuestions();
    const languageFilteredQuestions = filterQuestionsByLanguage(
      questions,
      normalizeLanguageFilter(language),
    );

    if (
      !difficulty ||
      difficulty === "All" ||
      (difficulty !== "Easy" &&
        difficulty !== "Medium" &&
        difficulty !== "Hard")
    ) {
      return languageFilteredQuestions;
    }

    return languageFilteredQuestions.filter(
      (item) => item.difficulty === difficulty,
    );
  } catch (error) {
    markDbFailure();
    logQuestionDbWarning("Difficulty query failed. Returning seeded list.");
    const seedQuestions = filterQuestionsByLanguage(
      getSeedPracticeQuestions(),
      normalizeLanguageFilter(language),
    );

    if (difficulty === "Easy" || difficulty === "Medium" || difficulty === "Hard") {
      return seedQuestions.filter((item) => item.difficulty === difficulty);
    }

    return seedQuestions;
  }
}

export async function getQuestionsCount() {
  try {
    const questions = await getAllQuestions();
    return questions.length;
  } catch (error) {
    markDbFailure();
    logQuestionDbWarning("Questions count query failed. Returning seeded count.");
    return getSeedPracticeQuestions().length;
  }
}
