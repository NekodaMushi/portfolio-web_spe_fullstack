CREATE TABLE IF NOT EXISTS "quizzes" (
	"id" text PRIMARY KEY NOT NULL,
	"idInt" serial NOT NULL,
	"user_id" text NOT NULL,
	"video_id" text NOT NULL,
	"quizData" jsonb NOT NULL,
	"created_at" timestamp DEFAULT date_trunc('minute', now()),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_video_id_unique" ON "quizzes" ("user_id","video_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_quiz_per_minute_unique" ON "quizzes" ("user_id","created_at");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
