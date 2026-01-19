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

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```
