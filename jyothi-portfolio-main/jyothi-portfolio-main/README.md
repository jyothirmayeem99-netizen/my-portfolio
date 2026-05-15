# Full-Stack Personal Portfolio

A production-ready intern project portfolio built with React, Express, MongoDB, and Netlify Functions.

## Features

- Responsive React frontend for hero, projects, skills, experience, and contact sections.
- Express backend with REST endpoints for profile, projects, skills, and messages.
- MongoDB persistence for projects, skills, and contact messages.
- Netlify Functions adapter for deployment on Netlify.
- Fallback sample data so the UI still works before MongoDB is connected.

## Tech Stack

- Frontend: React, Vite, CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Deployment: Netlify

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` from `.env.example` and add your MongoDB Atlas connection string.

3. Seed the database:

   ```bash
   npm run seed
   ```

4. Start the full app:

   ```bash
   npm run dev
   ```

The frontend runs on `http://127.0.0.1:5173` and the API runs on `http://127.0.0.1:5000`.

## API Endpoints

- `GET /api/profile`
- `GET /api/projects`
- `GET /api/skills`
- `POST /api/contact`

## Netlify Deployment

Set these environment variables in Netlify:

- `MONGODB_URI`
- `MONGODB_DB`

Then deploy from GitHub or the Netlify CLI.
