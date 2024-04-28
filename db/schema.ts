
import { relations } from "drizzle-orm";


import type { AdapterAccount } from '@auth/core/adapters'
import { randomUUID } from "crypto"
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
 integer, index, serial, jsonb, uniqueIndex
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
 
export const users = pgTable("user", {
 id: text("id").primaryKey().$defaultFn(() => randomUUID()),
 name: text("name"),
 email: text("email").notNull().unique(),
 emailVerified: timestamp("emailVerified", { mode: "date" }),
 image: text("image"),
})
 

export const transcripts = pgTable("transcripts", {
  id: serial('id').primaryKey(),
  videoId: text("video_id").notNull(),
  content: text("content").notNull(),
  userId: text("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const quizzes = pgTable("quizzes", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  intId: serial("idInt").notNull(),
  userId: text("user_id").notNull().references(() => users.id),
  videoId: text("video_id").notNull(),
  quizData: jsonb("quizData").notNull(),
  createdAt: timestamp('created_at').default(sql`date_trunc('minute', now())`),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
}, (table) => ({
  userVideoIdUnique: uniqueIndex("user_video_id_unique").on(table.userId, table.videoId)
}));
// ,
//   userQuizPerMinuteUnique: uniqueIndex("user_quiz_per_minute_unique").on(table.userId, table.createdAt)


// NEW








//      --- TABLE RELATIONS ---


export const usersRelations = relations(users, ({ many }) => ({
  transcripts: many(transcripts),
  quizzes: many(quizzes)
}));


export const transcriptsRelations = relations(transcripts, ({ one }) => ({
  user: one(users, { fields: [transcripts.userId], references: [users.id] }),
}));

export const quizzesRelations = relations(quizzes, ({ one }) => ({
  user: one(users, { fields: [quizzes.userId], references: [users.id] })
}));



//  ---- GITHUB AUTH TABLES BELLOW ----

export const accounts = pgTable(
"account",
{
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").$type<AdapterAccount["type"]>().notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
   id_token: text("id_token"),
  session_state: text("session_state"),
},
(account) => ({
  userIdIdx: index().on(account.userId),
  compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
})
)
 
export const sessions = pgTable("session", {
 id: text("id").primaryKey().$defaultFn(() => randomUUID()),
 sessionToken: text("sessionToken").notNull().unique(),
 userId: text("userId")
   .notNull()
   .references(() => users.id, { onDelete: "cascade" }),
 expires: timestamp("expires", { mode: "date" }).notNull(),
}, (session) => ({
  userIdIdx: index().on(session.userId)
}))
 
export const verificationTokens = pgTable(
 "verificationToken",
 {
   identifier: text("identifier").notNull(),
   token: text("token").notNull().unique(),
   expires: timestamp("expires", { mode: "date" }).notNull(),
 },
 (vt) => ({
   compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
 })
)
