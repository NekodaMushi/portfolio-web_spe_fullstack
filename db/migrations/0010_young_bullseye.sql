ALTER TABLE "quizzesCompleted" ADD COLUMN "above_60_four_time" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "quizzesCompleted" ADD COLUMN "above_70_three_time" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "quizzesCompleted" ADD COLUMN "under_60_three_time" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "quizzesCompleted" DROP COLUMN IF EXISTS "above_60_four_time_row";--> statement-breakpoint
ALTER TABLE "quizzesCompleted" DROP COLUMN IF EXISTS "above_70_three_time_row";--> statement-breakpoint
ALTER TABLE "quizzesCompleted" DROP COLUMN IF EXISTS "under_60_three_time_row";