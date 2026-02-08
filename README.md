# bs-said-yes

Event website built with Nuxt and Contentful CMS.

## Setup

```bash
# Install dependencies
pnpm install

# Populate the .env file
cp .env.example .env

# Generate GraphQL types
pnpm generate:types:watch
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

### Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

### Environment Variables

This project requires the following environment variables:

- Contentful CMS
  - `NUXT_CMS_ENV`: Contentful environment (ex. "master")
  - `NUXT_CMS_API_KEY`: Contentful content delivery API key
  - `NUXT_CMS_SPACE`: Contentful space ID
  - `NUXT_CMS_PREVIEW_API_KEY`: Contentful preview API key, used for preview mode
  - `NUXT_CMS_PREVIEW_SECRET`: Secret token for accessing preview mode, recommended to [generate a random string](https://www.lastpass.com/features/password-generator) with letters and numbers
- Site password configuration
  - `NUXT_SESSION_PASSWORD`: Secret token for encrypting session cookies, recommended to [generate a random string](https://www.lastpass.com/features/password-generator) with letters, numbers, and symbols, 32 characters
  - `NUXT_SITE_PASSWORD`: Guest password for accessing the site
- [OAuth Zitadel configuration](https://zitadel.com/docs/guides/integrate/login/oidc/device-authorization), for the admin dashboard login
  - `NUXT_OAUTH_ZITADEL_CLIENT_ID`: Client ID from Zitadel OAuth app
  - `NUXT_OAUTH_ZITADEL_CLIENT_SECRET`: Client secret from Zitadel OAuth app
  - `NUXT_OAUTH_ZITADEL_DOMAIN`: Domain for Zitadel OAuth app
- `DATABASE_URL`: Connection string for the [Neon](https://neon.com/) Postgres database
- `NUXT_DISCORD_WEBHOOK_URL`: Webhook URL for sending notifications to Discord when a new RSVP or memory is submitted _(optional)_

## Database

RSVPs and memory form submissions are stored using a Postgres database, with a [Neon](https://neon.com/) cloud database adapter. Drizzle ORM is used to query and run migrations against the database.

Database migrations are automatically run by GitHub actions on push to the "staging" and "main" branches.

**Other common database commands include:**

_Note: All commands are run against the `DATABASE_URL` credentials specified in the `.env` file._

- `pnpm db:generate`: Generate SQL migration files based on changes to the Drizzle schema.
- `pnpm db:migrate`: Run pending SQL migrations against the database.
- `pnpm db:push`: Sync the Drizzle schema to the database without generating a migration file.
- `pnpm db:studio`: Start the Drizzle Studio web UI for navigating the database.
- `pnpm db:seed`: Seed the database with test data from the `scripts/seed.csv` file. Test scenarios include a single invite, an invite with an unnamed plus one, and a family of 4.
- `pnpm db:seed:prd`: Seed the database with real guest data from the `scripts/guests.csv` file. This file is ignored by Git, to prevent committing sensitive guest information.

## Preview Mode

To view a page in preview mode, append the query parameter `?token=[NUXT_PREVIEW_SECRET]` to the end of the URL. After logging in, you will be able to view the preview version of the page.

For example: <http://localhost:3000/travel?token=abc123>
