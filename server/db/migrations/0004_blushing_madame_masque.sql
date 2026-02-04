ALTER TABLE "members" RENAME TO "guests";--> statement-breakpoint
ALTER TABLE "guests" DROP CONSTRAINT "members_name_unique";--> statement-breakpoint
ALTER TABLE "guests" DROP CONSTRAINT "relationship_type_check";--> statement-breakpoint
ALTER TABLE "guests" DROP CONSTRAINT "members_household_id_households_id_fk";
--> statement-breakpoint
ALTER TABLE "guests" ADD CONSTRAINT "guests_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."households"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guests" ADD CONSTRAINT "guests_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "guests" ADD CONSTRAINT "relationship_type_check" CHECK ("guests"."relationship_type" IN ('primary', 'plus_one', 'child'));