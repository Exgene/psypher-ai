/**
 * Environment configuration management
 */

// Environment variable validation
function getRequiredEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getOptionalEnvVar(name: string, defaultValue?: string): string | undefined {
  return process.env[name] || defaultValue;
}

// Validate required environment variables
const env = {
  DATABASE_URL: getRequiredEnvVar("DATABASE_URL"),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: getRequiredEnvVar("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"),
  CLERK_SECRET_KEY: getRequiredEnvVar("CLERK_SECRET_KEY"),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: getOptionalEnvVar("NEXT_PUBLIC_CLERK_SIGN_IN_URL", "/sign-in")!,
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: getOptionalEnvVar("NEXT_PUBLIC_CLERK_SIGN_UP_URL", "/sign-up")!,
  NODE_ENV: (process.env.NODE_ENV as "development" | "production" | "test") || "development",
  NEXT_PUBLIC_APP_URL: getOptionalEnvVar("NEXT_PUBLIC_APP_URL"),
  NEXT_PUBLIC_API_URL: getOptionalEnvVar("NEXT_PUBLIC_API_URL"),
};

export { env };

// Helper functions for environment checks
export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";

// Application URLs
export const appConfig = {
  baseUrl: env.NEXT_PUBLIC_APP_URL || `http://localhost:3000`,
  apiUrl: env.NEXT_PUBLIC_API_URL || `${env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api`,
  
  // Clerk URLs
  signInUrl: env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  signUpUrl: env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  
  // Database
  databaseUrl: env.DATABASE_URL,
} as const; 