"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { getEventsByTier } from "@/services/event-service";
import { ensureUserExists, updateUserTier as updateUserTierService } from "@/services/user-service";
import { type EventsResponse, type Tier } from "@/types";

/**
 * Get events accessible to the current user based on their tier
 * @returns Promise with events and user tier
 */
export async function getEvents(): Promise<EventsResponse> {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("You must be logged in to view events.");
    }

    // Ensure user exists and get their tier
    const user = await ensureUserExists(userId);
    
    // Get events accessible to the user
    const events = await getEventsByTier(user.tier);

    return {
      events,
      userTier: user.tier,
      success: true,
    };
  } catch (error) {
    console.error("Error in getEvents:", error);
    return {
      events: [],
      userTier: "free",
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch events",
    };
  }
}

/**
 * Update user tier with validation
 * @param tier - New tier to upgrade to
 * @returns Promise that resolves when tier is updated
 */
export async function updateUserTier(tier: Tier): Promise<void> {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("You must be logged in to upgrade your tier.");
    }

    // Update user tier using service
    await updateUserTierService(userId, tier);

    // Revalidate the dashboard page
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error in updateUserTier:", error);
    throw error;
  }
}

/**
 * Get current user tier
 * @returns Promise with user tier
 */
export async function getUserTier(): Promise<Tier> {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("You must be logged in to view your tier.");
    }

    const user = await ensureUserExists(userId);
    return user.tier;
  } catch (error) {
    console.error("Error in getUserTier:", error);
    throw error;
  }
} 