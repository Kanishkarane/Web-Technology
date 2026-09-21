# MERN Todo App

## Run
1. Start MongoDB (local `mongod`, or put an Atlas URI in server/.env)
2. Server:  cd server && npm install && npm run dev     (port 5000)
3. Client:  cd client && npm install && npm start       (port 3000)

## API
GET    /api/todos        - fetch all tasks
POST   /api/todos        - add task  { task, completed }
PUT    /api/todos/:id    - update task
DELETE /api/todos/:id    - delete task
