
import { relations } from "drizzle-orm";
// import { InferSelectModel } from 'drizzle-orm';

import type { AdapterAccount } from '@auth/core/adapters'
import { randomUUID } from "crypto"
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
 integer, index, serial, jsonb, uniqueIndex,
 real,
 boolean
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


// export type User = InferSelectModel<typeof users>;
// export type Transcript = InferSelectModel<typeof transcripts>;
// export type Quiz = InferSelectModel<typeof quizzes>;

 
export const users = pgTable("user", {
 id: text("id").primaryKey().$defaultFn(() => randomUUID()),
 name: text("name"),
 email: text("email").notNull().unique(),
 emailVerified: timestamp("emailVerified", { mode: "date" }),
 image: text("image"),
})
 

export const transcripts = pgTable("transcripts", {
  id: serial('id').primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  videoId: text("video_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  latest: integer("latest").notNull().default(0),
});

export const quizzes = pgTable("quizzes", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  intId: serial("idInt").notNull(),
  userId: text("user_id").notNull().references(() => users.id),
  videoId: text("video_id").notNull(),
  quizDataShort: jsonb("quiz_data_short"),
  quizDataMedium: jsonb("quiz_data_medium"),
  quizDataLarge: jsonb("quiz_data_large"),
  quizDataExam: jsonb("quiz_data_exam"),
  quizDataTest: jsonb("quiz_data_test"),
  createdAt: timestamp('created_at').default(sql`date_trunc('minute', now())`),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});


// NEW

export const quizzesCompleted = pgTable("quizzesCompleted", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  intId: serial("idInt").notNull(),
  userId: text("user_id").notNull().references(() => users.id),
  videoId: text("video_id").notNull(),
  quizId: text("quiz_id").notNull().references(() => quizzes.id),
  attemptNumber: integer("attempt_number").notNull().default(1),
  successRate: real("success_rate").notNull(),
  lastScore: real("last_score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  incorrectAnswers: integer("incorrect_answers").notNull(),
  highestScore: integer("highest_score").notNull().default(0),
  highestScoreTotal: integer("highest_score_total").notNull().default(0),
  above60FourTime: integer("above_60_four_time_row").notNull().default(0),
  above70ThreeTime: integer("above_70_three_time_row").notNull().default(0),
  reviewState: boolean('review_state').default(false),
  transitionToReview: boolean('transition_to_review').default(false),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),

}, (table) => ({
  userQuizIdAttemptUnique: uniqueIndex("user_quiz_id_attempt_unique").on(table.userId, table.quizId, table.attemptNumber),
}));


export const spacedRepetition = pgTable("spacedRepetition", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  userId: text("user_id").notNull().references(() => users.id),
  quizCompletedId: text("quiz_completed_id").notNull().references(() => quizzesCompleted.id),
  interval: integer("interval").notNull().default(1),
  easeFactor: integer("ease_factor").notNull().default(2500),
  dueDate: timestamp("due_date").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  userQuizCompletedIdIndex: index("user_quiz_completed_id_index").on(table.userId, table.quizCompletedId),
}));


//      --- TABLE RELATIONS ---


export const usersRelations = relations(users, ({ many }) => ({
  transcripts: many(transcripts),
  quizzes: many(quizzes),
  quizzesCompleted: many(quizzesCompleted),
  spacedRepetition: many(spacedRepetition)

}));


export const transcriptsRelations = relations(transcripts, ({ one }) => ({
  user: one(users, { fields: [transcripts.userId], references: [users.id] }),
}));

export const quizzesRelations = relations(quizzes, ({ one }) => ({
  user: one(users, { fields: [quizzes.userId], references: [users.id] })
}));

export const quizzesCompletedRelations = relations(quizzesCompleted, ({ one }) => ({
  user: one(users, { fields: [quizzesCompleted.userId], references: [users.id]}),
}))

export const spacedRepetitionRelations = relations(spacedRepetition, ({ one }) => ({
  user: one(users, { fields: [spacedRepetition.userId], references: [users.id] }),
  quizCompleted: one(quizzesCompleted, { fields: [spacedRepetition.quizCompletedId], references: [quizzesCompleted.id] }),
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
