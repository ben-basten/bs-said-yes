import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const allowedUsers = pgTable("allowed_users", {
  id: serial("id").primaryKey(),
  githubEmail: varchar("github_email", { length: 255 }).notNull().unique(),
});

export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }),
  story: varchar("story", { length: 5000 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type AllowedUser = typeof allowedUsers.$inferSelect;
export type NewAllowedUser = typeof allowedUsers.$inferInsert;
