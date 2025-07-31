/**
 * User service for handling user-related business logic
 */

import { eq } from "drizzle-orm";
import { db } from "@/lib/database";
import { users } from "@/db/schema";
import { validateTierUpgrade } from "@/lib/tier-utils";
import { type User, type Tier } from "@/types";

/**
 * Ensure user exists in database with default tier
 * @param clerkId - Clerk user ID
 * @returns Promise with user data
 */
export async function ensureUserExists(clerkId: string): Promise<User> {
  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.clerk_id, clerkId),
    });

    if (existingUser) {
      return existingUser;
    }

    // Create user with default free tier
    const [newUser] = await db
      .insert(users)
      .values({
        clerk_id: clerkId,
        tier: "free",
      })
      .returning();

    return newUser;
  } catch (error) {
    console.error("Error ensuring user exists:", error);
    throw new Error("Failed to create or retrieve user");
  }
}

/**
 * Get user by Clerk ID
 * @param clerkId - Clerk user ID
 * @returns Promise with user data or null
 */
export async function getUserByClerkId(clerkId: string): Promise<User | null> {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.clerk_id, clerkId),
    });

    return user || null;
  } catch (error) {
    console.error("Error fetching user by Clerk ID:", error);
    throw new Error("Failed to fetch user");
  }
}

/**
 * Update user tier with validation
 * @param clerkId - Clerk user ID
 * @param newTier - New tier to upgrade to
 * @returns Promise with updated user
 */
export async function updateUserTier(clerkId: string, newTier: Tier): Promise<User> {
  try {
    // First ensure user exists
    const user = await ensureUserExists(clerkId);
    
    // Validate the tier upgrade
    validateTierUpgrade(user.tier, newTier);

    // Update the user's tier
    const [updatedUser] = await db
      .update(users)
      .set({ 
        tier: newTier,
        updated_at: new Date(),
      })
      .where(eq(users.clerk_id, clerkId))
      .returning();

    if (!updatedUser) {
      throw new Error("Failed to update user tier");
    }

    return updatedUser;
  } catch (error) {
    console.error("Error updating user tier:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to update user tier");
  }
}

/**
 * Get user tier by Clerk ID
 * @param clerkId - Clerk user ID
 * @returns Promise with user tier
 */
export async function getUserTier(clerkId: string): Promise<Tier> {
  try {
    const user = await ensureUserExists(clerkId);
    return user.tier;
  } catch (error) {
    console.error("Error fetching user tier:", error);
    throw new Error("Failed to fetch user tier");
  }
}

/**
 * Delete user by Clerk ID
 * @param clerkId - Clerk user ID
 * @returns Promise with success status
 */
export async function deleteUser(clerkId: string): Promise<boolean> {
  try {
    const result = await db
      .delete(users)
      .where(eq(users.clerk_id, clerkId))
      .returning();

    return result.length > 0;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
} 