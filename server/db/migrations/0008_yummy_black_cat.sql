ALTER TABLE "guests" DROP CONSTRAINT "guests_name_unique";--> statement-breakpoint
CREATE UNIQUE INDEX "name_lower_idx" ON "guests" USING btree (lower("name"));