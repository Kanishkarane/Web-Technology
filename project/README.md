# Blog Manager (React + Express + MongoDB)

## Run
1. Server: `cd server && npm install`, put your Atlas connection string in `.env` (`ATLAS_URI`), then `npm start` (port 5050).
2. App: `cd app && npm install && npm run dev` (opens on http://localhost:5173).

## API
| Method | Route | Purpose |
|---|---|---|
| GET | /posts | list all posts |
| GET | /posts/:id | get one post |
| POST | /posts | create (title, author, body) |
| PATCH | /posts/:id | update |
| DELETE | /posts/:id | delete |
