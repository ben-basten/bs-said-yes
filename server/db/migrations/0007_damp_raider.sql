ALTER TABLE "allowed_users" RENAME COLUMN "github_email" TO "email";--> statement-breakpoint
ALTER TABLE "allowed_users" DROP CONSTRAINT "allowed_users_github_email_unique";--> statement-breakpoint
ALTER TABLE "allowed_users" ADD CONSTRAINT "allowed_users_email_unique" UNIQUE("email");