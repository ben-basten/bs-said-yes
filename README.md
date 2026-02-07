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
