import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const allowedUsers = pgTable("allowed_users", {
  id: serial("id").primaryKey(),
  githubEmail: varchar("github_email", { length: 255 }).notNull().unique(),
});

export type AllowedUser = typeof allowedUsers.$inferSelect;
export type NewAllowedUser = typeof allowedUsers.$inferInsert;
