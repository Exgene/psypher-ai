/**
 * Central type definitions for the application
 */

import { type events, type users } from "@/db/schema";

// Database entity types
export type Event = typeof events.$inferSelect;
export type User = typeof users.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type NewUser = typeof users.$inferInsert;

// Tier system types
export const TIER_ORDER = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3,
} as const;

export type Tier = keyof typeof TIER_ORDER;

// UI Component types
export interface TierSelectorProps {
  onTierChange: (tier: string) => void;
  isLoading: boolean;
  value: string;
  disabled?: boolean;
  className?: string;
}

export interface ImageWithLoadingProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  fallbackSrc?: string;
}

// API Response types
export interface EventsResponse {
  events: Event[];
  userTier: Tier;
  success: boolean;
  error?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// Component state types
export interface DashboardState {
  events: Event[];
  currentTier: Tier;
  isLoading: boolean;
  error: string | null;
  hasLoadedData: boolean;
}

// Constants
export const TIER_COLORS = {
  free: "text-emerald-600 dark:text-emerald-400",
  silver: "text-slate-600 dark:text-slate-400", 
  gold: "text-yellow-600 dark:text-yellow-400",
  platinum: "text-purple-600 dark:text-purple-400",
} as const;

export const TIER_GRADIENTS = {
  free: "from-emerald-500 to-teal-500",
  silver: "from-slate-400 to-slate-600",
  gold: "from-yellow-400 to-orange-500", 
  platinum: "from-purple-500 to-indigo-600",
} as const; 