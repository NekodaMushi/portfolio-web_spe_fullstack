import { serial, integer, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const transcripts = pgTable('transcripts', {
  id: serial('id').primaryKey(),
  videoId: text("video_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});



// export const users = pgTable("users", {
// 	id: serial("id").primaryKey(),
// 	name: text("name").notNull(),
// 	email: text("email").notNull(),
// 	createdAt: timestamp("created_at").notNull().defaultNow(),
// 	updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });
