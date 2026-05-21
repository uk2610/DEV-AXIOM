import { z } from "zod";
import { handleApiError, parseJson, rateLimit } from "@/lib/ai/api";
import { getCurrentUser } from "@/lib/ai/auth";
import { streamInterviewResponse } from "@/lib/ai/openai";

const schema = z.object({
  role: z.string().default("Senior Frontend Engineer"),
  question: z.string().min(4),
  answer: z.string().min(4),
});

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    rateLimit(`interview:stream:${user.id}`, 30);
    const input = await parseJson(request, schema);
    const stream = await streamInterviewResponse({
      role: input.role || "Senior Frontend Engineer",
      question: input.question,
      answer: input.answer,
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
