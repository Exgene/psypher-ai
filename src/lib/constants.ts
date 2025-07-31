/**
 * Application constants
 */

import { Crown, Star, Gem, Zap } from "lucide-react";
import { type Tier } from "@/types";

// Tier system constants
export const TIER_ICONS = {
  free: Zap,
  silver: Star,
  gold: Crown,
  platinum: Gem,
} as const;

// Database connection settings
export const DB_CONFIG = {
  maxConnections: 20,
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 30000,
} as const;

// Image settings
export const IMAGE_CONFIG = {
  defaultFallback: "https://via.placeholder.com/400x225/f3f4f6/9ca3af?text=Event+Image",
  loadingDelay: 300,
} as const;

// UI Animation settings
export const ANIMATION_CONFIG = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  ease: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
} as const;

// Validation rules
export const VALIDATION_RULES = {
  event: {
    titleMinLength: 3,
    titleMaxLength: 100,
    descriptionMinLength: 10,
    descriptionMaxLength: 500,
  },
} as const;

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
  timeout: 10000,
  retries: 3,
} as const; 