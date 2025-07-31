/**
 * Event service for handling event-related business logic
 */

import { eq, inArray, asc } from "drizzle-orm";
import { db } from "@/lib/database";
import { events } from "@/db/schema";
import { getAccessibleTiers } from "@/lib/tier-utils";
import { type Event, type Tier } from "@/types";

/**
 * Get events accessible to a user based on their tier
 * @param userTier - User's current tier
 * @returns Promise with events and user tier
 */
export async function getEventsByTier(userTier: Tier): Promise<Event[]> {
  try {
    const accessibleTiers = getAccessibleTiers(userTier);
    
    const eventList = await db
      .select()
      .from(events)
      .where(inArray(events.tier, accessibleTiers))
      .orderBy(asc(events.event_date));

    return eventList;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
}

/**
 * Get all events (admin function)
 * @returns Promise with all events
 */
export async function getAllEvents(): Promise<Event[]> {
  try {
    const eventList = await db
      .select()
      .from(events)
      .orderBy(asc(events.event_date));

    return eventList;
  } catch (error) {
    console.error("Error fetching all events:", error);
    throw new Error("Failed to fetch all events");
  }
}

/**
 * Get event by ID
 * @param eventId - Event ID
 * @returns Promise with event or null
 */
export async function getEventById(eventId: string): Promise<Event | null> {
  try {
    const event = await db
      .select()
      .from(events)
      .where(eq(events.id, eventId))
      .limit(1);

    return event[0] || null;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    throw new Error("Failed to fetch event");
  }
}

/**
 * Create a new event
 * @param eventData - Event data
 * @returns Promise with created event
 */
export async function createEvent(eventData: {
  title: string;
  description: string;
  event_date: Date;
  image_url?: string;
  tier: Tier;
}): Promise<Event> {
  try {
    const [event] = await db
      .insert(events)
      .values(eventData)
      .returning();

    return event;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
}

/**
 * Update an event
 * @param eventId - Event ID
 * @param eventData - Updated event data
 * @returns Promise with updated event
 */
export async function updateEvent(
  eventId: string,
  eventData: Partial<{
    title: string;
    description: string;
    event_date: Date;
    image_url: string;
    tier: Tier;
  }>
): Promise<Event> {
  try {
    const [event] = await db
      .update(events)
      .set(eventData)
      .where(eq(events.id, eventId))
      .returning();

    if (!event) {
      throw new Error("Event not found");
    }

    return event;
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event");
  }
}

/**
 * Delete an event
 * @param eventId - Event ID
 * @returns Promise with success status
 */
export async function deleteEvent(eventId: string): Promise<boolean> {
  try {
    const result = await db
      .delete(events)
      .where(eq(events.id, eventId))
      .returning();

    return result.length > 0;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Failed to delete event");
  }
} 