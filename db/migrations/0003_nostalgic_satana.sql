ALTER TABLE "quizzesCompleted" ADD COLUMN "above_60_four_time_row" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "quizzesCompleted" ADD COLUMN "above_70_three_time_row" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "quizzesCompleted" ADD COLUMN "review_state" boolean DEFAULT false;