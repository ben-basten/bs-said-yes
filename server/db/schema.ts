import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

/**
 * Allowed GitHub users - allowlist for who can log in to the admin dashboard
 * Add GitHub usernames here to grant access
 */
export const allowedUsers = pgTable("allowed_users", {
  id: serial("id").primaryKey(),
  githubEmail: varchar("github_email", { length: 255 }).notNull().unique(),
});

// Type exports for use throughout the application
export type AllowedUser = typeof allowedUsers.$inferSelect;
export type NewAllowedUser = typeof allowedUsers.$inferInsert;
