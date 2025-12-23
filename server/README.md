# Server — Local development

This folder contains the express server for the project.

## Quick start

1. Copy the example env file and edit values:

```bash
cd server
cp .env.example .env
# then edit .env to add your MONGO_URI (if using MongoDB)
```

2. Install dependencies and run in dev mode:

```bash
npm install
npm run dev
```

3. Verify:
- http://localhost:4000/ → returns `OK`
- http://localhost:4000/health → returns `{"status":"ok"}`

## Environment variables
- `PORT` — port to run the server (default `4000`)
- `MONGO_URI` — optional MongoDB connection string
- `NODE_ENV` — `development` or `production`

## Notes
- `.env` is intentionally not committed (see `.gitignore`).
- `nodemon` is used for development (`npm run dev`).
