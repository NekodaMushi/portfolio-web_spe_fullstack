CREATE TABLE IF NOT EXISTS "transcripts" (
	"id" serial PRIMARY KEY NOT NULL,
	"video_id" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
