CREATE TABLE "allowed_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"github_email" varchar(255) NOT NULL,
	CONSTRAINT "allowed_users_github_email_unique" UNIQUE("github_email")
);
