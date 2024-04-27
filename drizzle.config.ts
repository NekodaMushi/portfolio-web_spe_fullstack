import type { Config } from "drizzle-kit";

import { config } from "dotenv";

config({ path: ".env.local" });
export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URL as string,

  },
  verbose: true,
  strict: true

} satisfies Config;

