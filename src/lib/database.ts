/**
 * Database configuration and connection management
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";
import { DB_CONFIG } from "@/lib/constants";
import { env } from "@/lib/config";

// Create postgres connection with configuration
const sql = postgres(env.DATABASE_URL, {
  max: DB_CONFIG.maxConnections,
  connection: {
    application_name: "psypher-tasc",
  },
  connect_timeout: DB_CONFIG.connectionTimeoutMillis / 1000,
  idle_timeout: DB_CONFIG.idleTimeoutMillis / 1000,
});

// Create drizzle instance with schema
export const db = drizzle(sql, { schema });

// Export connection for cleanup if needed
export { sql };

/**
 * Test database connection
 * @returns Promise that resolves if connection is successful
 */
export async function testConnection(): Promise<void> {
  try {
    await sql`SELECT 1`;
    console.log("✅ Database connection successful");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
}

/**
 * Close database connection
 * @returns Promise that resolves when connection is closed
 */
export async function closeConnection(): Promise<void> {
  await sql.end();
  console.log("🔌 Database connection closed");
} 