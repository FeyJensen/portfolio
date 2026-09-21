# Fey Jensen Portfolio

A modern portfolio built with React and Vite, with a full-stack shop demo that connects to a PostgreSQL database.

## Features

- Clean, responsive landing page
- Hero section with personal branding and headshot
- Services overview
- Resume page
- API showcase page
- Full-stack shop demo with CRUD operations

## Tech Stack

- React
- Vite
- Node.js
- Express
- PostgreSQL-ready API layer
- Vercel deployment

## Local Development

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal, typically:

```bash
http://localhost:5173/
```

The app runs both the frontend and the API together locally. The API listens on port 3001 by default.

## Database setup

This app supports a real PostgreSQL connection through `DATABASE_URL`.

1. Create a Postgres database with a provider like Neon.
2. Copy the example environment file:

```bash
cp .env.example .env
```

3. Add your database URL and port:

```env
DATABASE_URL=postgresql://username:password@host:5432/database_name
PORT=3001
```

4. Start the app:

```bash
npm run dev
```

When `DATABASE_URL` is present, the app uses the database for product CRUD operations. If it is missing, the app falls back to demo data so the site still runs locally.

## Vercel + Neon setup

For deployment on Vercel:

1. Create a Neon Postgres database.
2. Copy the Neon connection string.
3. In Vercel Project Settings > Environment Variables, add:
   - `DATABASE_URL` = your Neon connection string
   - `PORT` = `3001`
4. Redeploy the project.

Example Neon connection string:

```env
DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-your-endpoint.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## Production Build

```bash
npm run build
```

## Deployment

This project is ready to deploy on Vercel. For a live full-stack version, use a managed Postgres provider such as Neon and set the environment variables in Vercel.
