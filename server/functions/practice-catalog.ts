import type { Question } from "@/types/Question";
import type { SandpackFiles } from "@codesandbox/sandpack-react";

export const PRACTICE_LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
] as const;

export type PracticeLanguage = (typeof PRACTICE_LANGUAGES)[number];

type PracticeQuestionSeed = {
  title: string;
  slug: string;
  difficulty: Question["difficulty"];
  tags: string[];
  timeLimit: number;
  content: string;
  solution: string;
};

const challengeTemplates = [
  {
    key: "sum-of-even-numbers",
    title: "Sum Of Even Numbers",
    difficulty: "Easy" as const,
    tags: ["arrays", "loops", "beginner"],
    timeLimit: 20,
    content: `## Problem
Given an array of integers, return the sum of all even numbers.

## Requirements
- Return \`0\` if the array is empty.
- Ignore odd numbers.
- The input can include negative values.

## Example
- Input: \`[1, 2, 3, 4, 10]\`
- Output: \`16\`

## Goal
Write a clean implementation with linear time complexity.`,
    solution: `## Approach
Loop through the array once and accumulate values that satisfy \`value % 2 === 0\`.

## Complexity
- Time: O(n)
- Space: O(1)` ,
  },
  {
    key: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium" as const,
    tags: ["hashmap", "strings", "intermediate"],
    timeLimit: 35,
    content: `## Problem
Given an array of strings, group the words that are anagrams of each other.

## Requirements
- Return an array of groups.
- Words in each group can be in any order.
- Preserve all duplicates.

## Example
- Input: \`["eat", "tea", "tan", "ate", "nat", "bat"]\`
- Output: \`[["eat","tea","ate"], ["tan","nat"], ["bat"]]\`

## Goal
Use hashing to avoid O(n^2) pair comparisons.`,
    solution: `## Approach
Use a canonical key for each word (usually sorted letters). Store groups in a map by that key.

## Complexity
- Time: O(n * k log k) where k is average word length
- Space: O(n * k)` ,
  },
  {
    key: "lfu-cache",
    title: "LFU Cache",
    difficulty: "Hard" as const,
    tags: ["design", "data-structures", "advanced"],
    timeLimit: 60,
    content: `## Problem
Design an LFU (Least Frequently Used) cache with O(1) average time for both get and put.

## Requirements
- If capacity is reached, evict the least frequently used key.
- If frequency ties, evict the least recently used among them.
- Implement \`get(key)\` and \`put(key, value)\`.

## Example
Capacity = 2
- put(1,1), put(2,2), get(1), put(3,3)
- Key 2 should be evicted first.

## Goal
Use frequency buckets and key-node mappings for O(1) behavior.`,
    solution: `## Approach
Track each key with value + frequency. Maintain:
- key -> node map
- frequency -> doubly linked list of nodes
- minimum frequency pointer

Update frequency on every access and move nodes between buckets.

## Complexity
- Time: O(1) average for get and put
- Space: O(capacity)` ,
  },
] as const;

function createStarterCode(language: PracticeLanguage, title: string): SandpackFiles {
  return {
    "/index.js": {
      active: true,
      code: `// ${title} (${language})\n// Implement your solution here.\n\nfunction solve(input) {\n  // TODO\n  return input;\n}\n\nconsole.log(solve([]));\n`,
    },
  };
}

function slugifyLanguage(language: PracticeLanguage) {
  return language.toLowerCase().replace(/\+/g, "p").replace(/#/g, "sharp").replace(/\s+/g, "-");
}

export function getSeedPracticeQuestions(): Question[] {
  const now = new Date();

  return PRACTICE_LANGUAGES.flatMap((language) => {
    const languageSlug = slugifyLanguage(language);

    return challengeTemplates.map((template) => ({
      id: `seed-${languageSlug}-${template.key}`,
      title: `${template.title} (${language})`,
      slug: `${languageSlug}-${template.key}`,
      difficulty: template.difficulty,
      tags: [language, ...template.tags],
      content: `${template.content}\n\n## Language Focus\nSolve this challenge using **${language}** best practices.`,
      starterCode: createStarterCode(language, template.title),
      solution: template.solution,
      timeLimit: template.timeLimit,
      createdAt: now,
      updatedAt: now,
    }));
  });
}

export function normalizeLanguageFilter(language?: string) {
  if (!language || language === "All") {
    return undefined;
  }

  const match = PRACTICE_LANGUAGES.find(
    (item) => item.toLowerCase() === language.toLowerCase(),
  );
  return match;
}

export function filterQuestionsByLanguage<T extends { tags: string[] }>(
  questions: T[],
  language?: string,
) {
  const normalizedLanguage = normalizeLanguageFilter(language);
  if (!normalizedLanguage) {
    return questions;
  }

  return questions.filter((item) =>
    item.tags.some((tag) => tag.toLowerCase() === normalizedLanguage.toLowerCase()),
  );
}