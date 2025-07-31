CREATE TYPE "public"."tier" AS ENUM('free', 'silver', 'gold', 'platinum');--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"event_date" timestamp NOT NULL,
	"image_url" text,
	"tier" "tier" NOT NULL
);
