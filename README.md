# From Voices to Discovery

Movement-first web application for Afromics and the African Genome Project.

## Structure

- `client/`: React 18 + Vite + TypeScript frontend
- `server/`: Express API with MySQL-ready configuration

## Local Development

1. Copy `server/.env.example` to `server/.env`.
2. Install dependencies from the repo root with `npm install`.
3. Run the API with `npm run dev:server`.
4. Run the client with `npm run dev:client`.

## Deployment

`railway.toml` is included for Railway deployment using the root workspace install/build flow and `node server/index.js` as the production start command.
