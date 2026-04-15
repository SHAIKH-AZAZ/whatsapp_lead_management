# WaBiz

WhatsApp Business SaaS dashboard for Shopify stores, D2C brands, and local businesses.

## Tech Stack
- **Frontend**: Vite + React + Tailwind + Framer Motion
- **Backend**: Express (Vercel Serverless)
- **Database**: Supabase (Postgres)
- **Automation**: GitHub Actions + x-cron-secret

## Supabase Setup

1. Create a Supabase project.
2. Open the SQL Editor and run the schema files in `/supabase/`.
3. Copy `.env.example` to `.env` and fill in:
   `VITE_SUPABASE_URL`
   `VITE_SUPABASE_ANON_KEY`
4. Set `VITE_API_ADAPTER=supabase`.
5. Run `bun install`.
6. Run `bun run dev`.

## Railway + Neon Deployment

Use the repository root as the Railway service source. This project builds the backend image from `backend/Dockerfile`, but that Dockerfile also copies workspace files from the repo root.

### Railway Settings

Add these service variables in Railway:

- `RAILWAY_DOCKERFILE_PATH=backend/Dockerfile`
- `DATABASE_URL=<your Neon connection string>`

Set the Railway health check path to:

- `/health`

Notes:

- Do not hardcode `DATABASE_URL` in the Dockerfile.
- Railway will inject `DATABASE_URL` at runtime.
- The backend already reads `process.env.PORT`, so Railway can assign the port automatically.

### Local Docker Run With Neon

If your local `.env` contains the Neon connection string, run the container from the repo root with:

```bash
docker build -t whatsapp -f backend/Dockerfile .
docker run --rm --env-file .env -p 3001:3001 whatsapp
```

## Current Adapters

- `mock`: local browser storage, no backend needed
- `http`: custom Express backend adapter (Production)
- `supabase`: Direct Supabase Auth + Postgres integration
