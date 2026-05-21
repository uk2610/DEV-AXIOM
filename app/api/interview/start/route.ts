import { z } from "zod";
import { getCurrentUser } from "@/lib/ai/auth";
import { handleApiError, jsonResponse, parseJson, rateLimit } from "@/lib/ai/api";
import { generateInterviewQuestion } from "@/lib/ai/openai";
import { createInterviewSession } from "@/lib/ai/repository";

const schema = z.object({
  role: z.string().min(2).default("Senior Frontend Engineer"),
  type: z.enum(["TECHNICAL", "BEHAVIORAL", "SYSTEM_DESIGN", "CODING"]).default("SYSTEM_DESIGN"),
  difficulty: z.string().default("medium"),
  resumeSignals: z.array(z.string()).optional(),
});

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    rateLimit(`interview:start:${user.id}`, 10);
    const input = await parseJson(request, schema);
    const normalized = {
      role: input.role || "Senior Frontend Engineer",
      type: input.type || "SYSTEM_DESIGN",
      difficulty: input.difficulty || "medium",
      resumeSignals: input.resumeSignals,
    };
    const question = await generateInterviewQuestion(normalized);
    const session = await createInterviewSession({
      userId: user.id,
      role: normalized.role,
      type: normalized.type,
      difficulty: normalized.difficulty,
      question,
    });
    return jsonResponse({ session, user });
  } catch (error) {
    return handleApiError(error);
  }
}
