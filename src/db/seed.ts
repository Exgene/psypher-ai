import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import * as schema from "./schema";

dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL!;
const sql = postgres(connectionString);
const db = drizzle(sql, { schema });

async function main() {
  await db.insert(schema.events).values([
    {
      title: "Free Community Meetup",
      description: "A casual get-together for our free tier users.",
      event_date: new Date("2024-09-15T18:00:00Z"),
      tier: "free",
      image_url: "https://via.placeholder.com/300",
    },
    {
      title: "Introduction to Web Development",
      description: "A beginner-friendly workshop for our free tier users.",
      event_date: new Date("2024-09-20T14:00:00Z"),
      tier: "free",
      image_url: "https://via.placeholder.com/300",
    },
    {
      title: "Silver Exclusive: Networking Night",
      description: "An exclusive networking event for Silver tier members.",
      event_date: new Date("2024-10-05T19:00:00Z"),
      tier: "silver",
      image_url: "https://via.placeholder.com/300",
    },
    {
      title: "Advanced CSS Techniques",
      description: "A deep dive into advanced CSS for our Silver tier members.",
      event_date: new Date("2024-10-10T16:00:00Z"),
      tier: "silver",
      image_url: "https://via.placeholder.com/300",
    },
    {
      title: "Gold Tier Gala Dinner",
      description: "An elegant gala dinner for our Gold tier members.",
      event_date: new Date("2024-11-12T20:00:00Z"),
      tier: "gold",
      image_url: "https://via.placeholder.com/300",
    },
    {
      title: "AI & Machine Learning Summit",
      description: "An exclusive summit on AI for our Gold tier members.",
      event_date: new Date("2024-11-20T09:00:00Z"),
      tier: "gold",
      image_url: "https://via.placeholder.com/300",
    },
    {
      title: "Platinum Members Retreat",
      description: "A luxurious weekend retreat for our Platinum members.",
      event_date: new Date("2024-12-01T10:00:00Z"),
      tier: "platinum",
      image_url: "https://via.placeholder.com/300",
    },
    {
      title: "Exclusive Tech Conference",
      description: "An invite-only tech conference for Platinum members.",
      event_date: new Date("2024-12-15T09:00:00Z"),
      tier: "platinum",
      image_url: "https://via.placeholder.com/300",
    },
  ]);

  console.log("Seeding completed successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
}); 