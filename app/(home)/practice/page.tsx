import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getQuestionsByDifficulty } from "@/server/functions/questions";
import { Metadata } from "next";
import { PRACTICE_LANGUAGES } from "@/server/functions/practice-catalog";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ difficulty?: string; language?: string }>;
}): Promise<Metadata> {
  const { difficulty, language } = await searchParams;

  const title = difficulty || language
    ? `${difficulty ? `${difficulty} ` : ""}${language ? `${language} ` : ""}Practice Questions - Dev Axioms`
    : "Practice Coding Questions - Dev Axioms";

  const description = difficulty || language
    ? `Practice ${difficulty ? difficulty.toLowerCase() : "all"} level ${language || "multi-language"} coding challenges to sharpen your programming skills.`
    : "Practice coding questions across all difficulty levels to improve your programming skills.";

  return {
    title,
    description,
    keywords: `coding practice, programming challenges, interview questions, ${difficulty ? difficulty.toLowerCase() : "easy medium hard"}, ${language ? language.toLowerCase() : "javascript typescript python java cpp csharp go rust"}, coding interview prep`,
  };
}

const difficultyVariants: Record<string, string> = {
  Easy: "bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800",
  Medium:
    "bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-800",
  Hard: "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800",
};

interface PracticePageProps {
  searchParams: Promise<{
    difficulty?: string;
    language?: string;
  }>;
}

export default async function PracticePage({
  searchParams,
}: PracticePageProps) {
  const { difficulty, language } = await searchParams;
  const questions = await getQuestionsByDifficulty(difficulty, language);
  const currentDifficulty = difficulty || "All";
  const currentLanguage = language || "All";
  const levelCounts = {
    Easy: questions.filter((question) => question.difficulty === "Easy").length,
    Medium: questions.filter((question) => question.difficulty === "Medium").length,
    Hard: questions.filter((question) => question.difficulty === "Hard").length,
  };
  const languageCounts = PRACTICE_LANGUAGES.map((item) => ({
    language: item,
    total: questions.filter((question) =>
      question.tags.some((tag) => tag.toLowerCase() === item.toLowerCase()),
    ).length,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Practice</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Sharpen your coding skills with curated beginner-to-advanced tracks.
            {currentDifficulty !== "All" && (
              <span className="ml-1">
                • Showing {questions.length} {currentDifficulty.toLowerCase()}{" "}
                question{questions.length !== 1 ? "s" : ""}
              </span>
            )}
            {currentLanguage !== "All" && (
              <span className="ml-1">• Language: {currentLanguage}</span>
            )}
            {currentDifficulty === "All" && (
              <span className="ml-1">
                • {questions.length} question{questions.length !== 1 ? "s" : ""}{" "}
                total
              </span>
            )}
          </p>
        </div>
        {/* Difficulty Filters */}
        <div className="flex gap-2">
          {["All", "Easy", "Medium", "Hard"].map((level) => (
            <Link
              key={level}
              href={`/practice?difficulty=${level === "All" ? "All" : level}&language=${currentLanguage}`}
            >
              <Button
                variant={currentDifficulty === level ? "outline" : "ghost"}
                size="sm"
                className={cn(
                  "transition-all",
                  currentDifficulty === level &&
                    "bg-primary/10 text-primary border-primary/20",
                )}
              >
                {level}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-8 space-y-4 rounded-xl border bg-card p-4">
        <div className="flex flex-wrap gap-2">
          {["All", ...PRACTICE_LANGUAGES].map((item) => (
            <Link
              key={item}
              href={`/practice?difficulty=${currentDifficulty}&language=${item}`}
            >
              <Button
                variant={currentLanguage === item ? "outline" : "ghost"}
                size="sm"
                className={cn(
                  "transition-all",
                  currentLanguage === item &&
                    "bg-primary/10 text-primary border-primary/20",
                )}
              >
                {item}
              </Button>
            </Link>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-green-200/60 bg-green-50/50 p-3 dark:border-green-900 dark:bg-green-950/20">
            <div className="text-sm font-semibold text-green-700 dark:text-green-300">
              Beginner
            </div>
            <div className="text-2xl font-bold">{levelCounts.Easy}</div>
            <p className="text-muted-foreground text-xs">Easy challenges</p>
          </div>
          <div className="rounded-lg border border-yellow-200/60 bg-yellow-50/50 p-3 dark:border-yellow-900 dark:bg-yellow-950/20">
            <div className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
              Intermediate
            </div>
            <div className="text-2xl font-bold">{levelCounts.Medium}</div>
            <p className="text-muted-foreground text-xs">Medium challenges</p>
          </div>
          <div className="rounded-lg border border-red-200/60 bg-red-50/50 p-3 dark:border-red-900 dark:bg-red-950/20">
            <div className="text-sm font-semibold text-red-700 dark:text-red-300">
              Advanced
            </div>
            <div className="text-2xl font-bold">{levelCounts.Hard}</div>
            <p className="text-muted-foreground text-xs">Hard challenges</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {languageCounts.map((item) => (
            <span key={item.language} className="rounded-md border px-2 py-1">
              {item.language}: {item.total}
            </span>
          ))}
        </div>
      </div>

      {/* Questions List */}
      {questions.length === 0 ? (
        <div className="bg-card rounded-lg border p-12 text-center">
          <div className="mx-auto max-w-md">
            <h3 className="mb-2 text-lg font-semibold">
              No Questions Available
            </h3>
            <p className="text-muted-foreground mb-4">
              No questions matched these filters. Try switching language or
              difficulty to keep practicing.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-card divide-y rounded-lg border">
          {questions.map((question) => (
            <Link
              href={`/practice/${question.slug}`}
              key={question.id}
              className="hover:bg-muted/40 group flex flex-col gap-3 p-5 transition-colors sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="text-base font-medium transition-all group-hover:underline">
                  {question.title}
                </div>
                <div className="mt-2 flex w-full flex-wrap items-center gap-2 text-xs">
                  {/* Tags */}
                  {question.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  <Badge
                    className={cn(difficultyVariants[question.difficulty])}
                  >
                    {question.difficulty}
                  </Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
