ALTER TABLE "stories" ADD COLUMN "uuid" uuid DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "stories" ADD CONSTRAINT "stories_uuid_unique" UNIQUE("uuid");