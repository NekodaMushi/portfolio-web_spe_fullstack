CREATE TABLE IF NOT EXISTS "transcripts" (
	"id" serial PRIMARY KEY NOT NULL,
	"videoId" text NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
