import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: [ "./db/schemas/schema.ts", "./db/schemas/users.ts" ],
  out: "./db/migrations",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true
});
