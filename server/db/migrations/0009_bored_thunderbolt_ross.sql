ALTER TABLE "rsvp_responses" DROP CONSTRAINT "rsvp_responses_household_id_households_id_fk";
--> statement-breakpoint
ALTER TABLE "rsvp_responses" ADD CONSTRAINT "rsvp_responses_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."households"("id") ON DELETE cascade ON UPDATE no action;