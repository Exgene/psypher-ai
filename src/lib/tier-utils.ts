/**
 * Tier system utility functions
 */

import { TIER_ORDER, type Tier } from "@/types";

/**
 * Check if a user can upgrade to a specific tier
 * @param currentTier - User's current tier
 * @param targetTier - Tier they want to upgrade to
 * @returns boolean indicating if upgrade is allowed
 */
export function canUpgradeToTier(currentTier: Tier, targetTier: Tier): boolean {
  const currentIndex = TIER_ORDER[currentTier];
  const targetIndex = TIER_ORDER[targetTier];
  
  // Allow downgrades and same tier
  if (targetIndex <= currentIndex) {
    return true;
  }
  
  // For upgrades, only allow one tier level at a time
  return targetIndex === currentIndex + 1;
}

/**
 * Get all tiers accessible to a user based on their current tier
 * @param userTier - User's current tier
 * @returns Array of accessible tiers
 */
export function getAccessibleTiers(userTier: Tier): Tier[] {
  const userTierIndex = TIER_ORDER[userTier];
  return Object.keys(TIER_ORDER).filter(
    (tier) => TIER_ORDER[tier as Tier] <= userTierIndex
  ) as Tier[];
}

/**
 * Validate tier upgrade eligibility and throw error if invalid
 * @param currentTier - User's current tier
 * @param newTier - Tier they want to upgrade to
 * @throws Error if upgrade is not allowed
 */
export function validateTierUpgrade(currentTier: Tier, newTier: Tier): void {
  if (!canUpgradeToTier(currentTier, newTier)) {
    const currentIndex = TIER_ORDER[currentTier];
    const newIndex = TIER_ORDER[newTier];
    
    if (newIndex > currentIndex + 1) {
      throw new Error(
        `Cannot upgrade from ${currentTier} to ${newTier}. You can only upgrade one tier at a time.`
      );
    }
  }
}

/**
 * Get the next available tier for upgrade
 * @param currentTier - User's current tier
 * @returns Next tier or null if already at max tier
 */
export function getNextTier(currentTier: Tier): Tier | null {
  const currentIndex = TIER_ORDER[currentTier];
  const tierEntries = Object.entries(TIER_ORDER);
  const nextTier = tierEntries.find(([, index]) => index === currentIndex + 1);
  
  return nextTier ? (nextTier[0] as Tier) : null;
}

/**
 * Get tier display information
 * @param tier - Tier to get info for
 * @returns Object with tier display properties
 */
export function getTierInfo(tier: Tier) {
  const tierNames = {
    free: "Free",
    silver: "Silver",
    gold: "Gold",
    platinum: "Platinum",
  };

  const tierDescriptions = {
    free: "Basic access to public events",
    silver: "Access to premium events and early registration",
    gold: "VIP access with exclusive networking opportunities",
    platinum: "Ultimate access with personalized concierge service",
  };

  return {
    name: tierNames[tier],
    description: tierDescriptions[tier],
    level: TIER_ORDER[tier],
    isMaxTier: tier === "platinum",
  };
} 