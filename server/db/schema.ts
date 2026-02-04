import {
  pgTable,
  serial,
  timestamp,
  varchar,
  uuid,
  text,
  boolean,
  check,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

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
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const households = pgTable("households", {
  id: uuid("id").primaryKey().defaultRandom(),
  nickname: varchar("nickname", { length: 255 }).notNull(),
  mailingAddress: text("mailing_address").notNull(),
  inviteSent: boolean("invite_sent").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const householdsRelations = relations(households, ({ many, one }) => ({
  members: many(members),
  rsvpResponse: one(rsvpResponses, {
    fields: [households.id],
    references: [rsvpResponses.householdId],
  }),
}));

export const members = pgTable(
  "members",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    householdId: uuid("household_id")
      .notNull()
      .references(() => households.id, { onDelete: "cascade" }),
    // Name is intentionally unique to prevent needing to handle looking up multiple guests with the same name, will address if this becomes a problem
    name: varchar("name", { length: 255 }).unique(),
    relationshipType: varchar("relationship_type", { length: 20 }).notNull(),
    isAttending: boolean("is_attending"),
    isSearchable: boolean("is_searchable").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    check(
      "relationship_type_check",
      sql`${table.relationshipType} IN ('primary', 'plus_one', 'child')`,
    ),
  ],
);

export const membersRelations = relations(members, ({ one }) => ({
  household: one(households, {
    fields: [members.householdId],
    references: [households.id],
  }),
}));

export const rsvpResponses = pgTable("rsvp_responses", {
  id: uuid("id").primaryKey().defaultRandom(),
  householdId: uuid("household_id")
    .notNull()
    .unique()
    .references(() => households.id),
  accommodations: text("accommodations"),
  songRecommendations: text("song_recommendations"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const rsvpResponsesRelations = relations(rsvpResponses, ({ one }) => ({
  household: one(households, {
    fields: [rsvpResponses.householdId],
    references: [households.id],
  }),
}));

export type AllowedUser = typeof allowedUsers.$inferSelect;
export type NewAllowedUser = typeof allowedUsers.$inferInsert;

export type Household = typeof households.$inferSelect;
export type NewHousehold = typeof households.$inferInsert;

export type Member = typeof members.$inferSelect;
export type NewMember = typeof members.$inferInsert;

export type RSVPResponse = typeof rsvpResponses.$inferSelect;
export type NewRSVPResponse = typeof rsvpResponses.$inferInsert;
