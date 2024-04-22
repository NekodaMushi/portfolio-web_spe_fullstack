import type { AdapterAccount } from '@auth/core/adapters'
import { randomUUID } from "crypto"
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
 integer, index
} from "drizzle-orm/pg-core"

 
export const users = pgTable("user", {
 id: text("id").primaryKey().$defaultFn(() => randomUUID()),
 name: text("name"),
 email: text("email").notNull().unique(),
 emailVerified: timestamp("emailVerified", { mode: "date" }),
 image: text("image"),
})
 
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
