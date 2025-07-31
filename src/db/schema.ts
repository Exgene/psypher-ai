/**
 * Database schema definitions for the application
 */

import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";

// Enum for tier levels
export const tierEnum = pgEnum("tier", ["free", "silver", "gold", "platinum"]);

/**
 * Users table - stores user information and tier status
 */
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerk_id: text("clerk_id").notNull().unique(),
  tier: tierEnum("tier").notNull().default("free"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Events table - stores event information with tier-based access control
 */
export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  event_date: timestamp("event_date").notNull(),
  image_url: text("image_url"),
  tier: tierEnum("tier").notNull(),
}); 