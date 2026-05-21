# Axiom Interview AI - Production Architecture

This project is structured as a deployable AI SaaS application.

## Core Systems

- **Auth:** Better Auth with email/password and optional Google/GitHub OAuth.
- **Database:** PostgreSQL-ready Drizzle schema plus Prisma schema for recruiter-friendly data modeling.
- **AI Interview Engine:** `/api/interview/start`, `/api/interview/answer`, `/api/interview/stream`, `/api/interview/history`.
- **Voice:** `/api/voice/transcribe` supports Whisper when `OPENAI_API_KEY` is configured and demo fallback otherwise.
- **Coding:** `/api/coding/run` evaluates code against deterministic test signals and stores results.
- **Resume:** `/api/resume/upload` accepts file/text uploads, extracts skills, weak areas, and generated questions.
- **Analytics:** `/api/analytics` aggregates readiness, streaks, weak topics, and trend data.
- **State:** `store/interview-ai-store.ts` uses Zustand for interview, coding, and analytics state.

## Local Setup

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL`.
3. Set `BETTER_AUTH_SECRET`.
4. Optional: set `OPENAI_API_KEY` for real model/Whisper calls.
5. Run `npm install --legacy-peer-deps`.
6. Run `npm run db:generate` and `npm run db:push` for Drizzle.
7. Run `npm run dev`.

## Deployment

- Frontend/API: Vercel.
- Database: Supabase, Neon, Railway Postgres, or managed Postgres.
- Secrets: configure `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`, and `OPENAI_API_KEY`.

The API layer degrades gracefully into deterministic fallback behavior when OpenAI or the database is not available, which keeps demos stable while preserving production integration points.
