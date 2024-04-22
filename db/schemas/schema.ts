
import { relations } from "drizzle-orm";
import { serial, integer, text, timestamp, pgTable } from "drizzle-orm/pg-core";

import {users} from "./users"





export const transcripts = pgTable('transcripts', {
  id: serial('id').primaryKey(),
  videoId: text("video_id").notNull(),
  content: text("content").notNull(),
  userId: text("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});


export const usersRelations = relations(users, ({ many }) => ({
  transcripts: many(transcripts)
}));


// I'm not sure it's useful to define this relationship allowing to find an user from a transcript but I will leave it here in case I haven't think about another usecase around it.
export const transcriptsRelations = relations(transcripts, ({ one }) => ({
  user: one(users, { fields: [transcripts.userId], references: [users.id] }),
}));
