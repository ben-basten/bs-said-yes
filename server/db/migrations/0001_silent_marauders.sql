CREATE TABLE "allowed_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"github_username" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "allowed_users_github_username_unique" UNIQUE("github_username")
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "is_admin" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "github_username" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_github_username_unique" UNIQUE("github_username");