import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

/**
 * Allowed GitHub users - allowlist for who can log in to the admin dashboard
 * Add GitHub usernames here to grant access
 */
export const allowedUsers = pgTable("allowed_users", {
  id: serial("id").primaryKey(),
  githubUsername: varchar("github_username", { length: 255 })
    .notNull()
    .unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Users table for nuxt-auth-utils OAuth authentication
 * Stores user information from OAuth providers (e.g., Google, GitHub)
 * Only users in the allowed_users table can create accounts here
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  avatarUrl: text("avatar_url"),
  githubUsername: varchar("github_username", { length: 255 })
    .notNull()
    .unique(),

  // OAuth provider information
  provider: varchar("provider", { length: 50 }).notNull(), // e.g., 'google', 'github'
  providerId: varchar("provider_id", { length: 255 }).notNull(), // ID from the OAuth provider

  // Admin dashboard access
  isAdmin: boolean("is_admin").default(true).notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Type exports for use throughout the application
export type AllowedUser = typeof allowedUsers.$inferSelect;
export type NewAllowedUser = typeof allowedUsers.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
