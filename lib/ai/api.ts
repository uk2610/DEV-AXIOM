import { NextResponse } from "next/server";
import { z } from "zod";
import type { ApiResponse } from "./types";

export const jsonResponse = <T>(data: T, requestId = crypto.randomUUID()) =>
  NextResponse.json<ApiResponse<T>>({ ok: true, data, requestId });

export const errorResponse = (
  code: string,
  message: string,
  status = 400,
  requestId = crypto.randomUUID(),
) =>
  NextResponse.json<ApiResponse<never>>(
    { ok: false, error: { code, message }, requestId },
    { status },
  );

export async function parseJson<T>(request: Request, schema: z.ZodType<T>) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    throw new ApiError("VALIDATION_ERROR", parsed.error.issues[0]?.message || "Invalid request body", 422);
  }
  return parsed.data;
}

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 30, windowMs = 60_000) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }
  if (current.count >= limit) {
    throw new ApiError("RATE_LIMITED", "Too many requests. Please slow down.", 429);
  }
  current.count += 1;
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return errorResponse(error.code, error.message, error.status);
  }
  console.error(error);
  return errorResponse("INTERNAL_ERROR", "Something went wrong while processing the request.", 500);
}
