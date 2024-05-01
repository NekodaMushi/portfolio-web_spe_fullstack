CREATE TABLE IF NOT EXISTS "quizzes" (
	"id" text PRIMARY KEY NOT NULL,
	"idInt" serial NOT NULL,
	"user_id" text NOT NULL,
	"video_id" text NOT NULL,
	"quiz_data_short" jsonb,
	"quiz_data_medium" jsonb,
	"quiz_data_large" jsonb,
	"quiz_data_exam" jsonb,
	"quiz_data_test" jsonb,
	"created_at" timestamp DEFAULT date_trunc('minute', now()),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quizzesCompleted" (
	"id" text PRIMARY KEY NOT NULL,
	"idInt" serial NOT NULL,
	"user_id" text NOT NULL,
	"quiz_id" text NOT NULL,
	"attempt_number" integer DEFAULT 1 NOT NULL,
	"total_questions" integer NOT NULL,
	"incorrect_answers" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "spacedRepetition" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"quiz_completed_id" text NOT NULL,
	"interval" integer DEFAULT 1 NOT NULL,
	"ease_factor" integer DEFAULT 2500 NOT NULL,
	"due_date" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_quiz_id_attempt_unique" ON "quizzesCompleted" ("user_id","quiz_id","attempt_number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_quiz_completed_id_index" ON "spacedRepetition" ("user_id","quiz_completed_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quizzesCompleted" ADD CONSTRAINT "quizzesCompleted_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quizzesCompleted" ADD CONSTRAINT "quizzesCompleted_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spacedRepetition" ADD CONSTRAINT "spacedRepetition_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spacedRepetition" ADD CONSTRAINT "spacedRepetition_quiz_completed_id_quizzesCompleted_id_fk" FOREIGN KEY ("quiz_completed_id") REFERENCES "quizzesCompleted"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
