import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";

// console.log(schema);
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, {
	schema });


// , logger: true


export * from 'drizzle-orm'








