import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL?.trim();

function createUnavailableDb() {
  return new Proxy(
    {},
    {
      get() {
        throw new Error("DATABASE_URL is not set");
      },
    },
  ) as ReturnType<typeof drizzle>;
}

export const db = databaseUrl
  ? drizzle(
      postgres(databaseUrl, {
        max: 10,
        prepare: false,
      }),
    )
  : createUnavailableDb();