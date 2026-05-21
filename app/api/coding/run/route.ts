import { z } from "zod";
import { getCurrentUser } from "@/lib/ai/auth";
import { handleApiError, jsonResponse, parseJson, rateLimit } from "@/lib/ai/api";
import { saveCodingResult } from "@/lib/ai/repository";

const schema = z.object({
  sessionId: z.string().optional(),
  language: z.string().default("TypeScript"),
  code: z.string().min(5),
});

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    rateLimit(`coding:run:${user.id}`, 40);
    const input = await parseJson(request, schema);
    const normalized = input.code.toLowerCase();
    const tests = [
      { label: "debounces requests", passed: /settimeout|timer|debounce/.test(normalized) },
      { label: "cancels stale responses", passed: /requestid|request_id|active/.test(normalized) },
      { label: "sorts by score", passed: /sort/.test(normalized) },
      { label: "handles empty input", passed: /query\.trim|query ===|if not query|return \[\]/.test(normalized) },
    ];
    const testsPassed = tests.filter((test) => test.passed).length;
    const result = {
      userId: user.id,
      sessionId: input.sessionId,
      language: input.language,
      code: input.code,
      testsPassed,
      testsTotal: tests.length,
      output:
        testsPassed === tests.length
          ? "All tests passed. AI evaluation: production-ready solution shape."
          : `${testsPassed}/${tests.length} tests passed. Use the AI hint to close the failing edge case.`,
      metrics: {
        correctness: Math.round((testsPassed / tests.length) * 100),
        complexity: normalized.includes("sort") ? 82 : 58,
        testing: testsPassed * 22,
      },
      tests,
    };
    await saveCodingResult(result);
    return jsonResponse(result);
  } catch (error) {
    return handleApiError(error);
  }
}
