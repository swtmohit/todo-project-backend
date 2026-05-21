# Backend README

## Project Overview

This backend is a Node.js and Express REST API for a task management application. It handles authentication, project management, task CRUD operations, JWT-based authorization, request validation, and MongoDB persistence.

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- express-validator
- dotenv
- cors
- nodemon

## Local Setup

1. Open the backend directory:

```bash
cd Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with your own values:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

4. Start the development server:

```bash
npm run dev
```

5. The backend will run at:

```text
http://localhost:5000
```

## Deployment URLs

- Local backend URL: `http://localhost:5000`
- Local health check URL: `http://localhost:5000/api/health`
- Local frontend origin: `http://localhost:5173`
- Production backend URL: `https://todo-project-backend-38jn.onrender.com`
- Production health check URL: `https://todo-project-backend-38jn.onrender.com/api/health`
- Production frontend URL: `https://todo-project-frontend-kappa.vercel.app`

## Folder Structure

```text
Backend/
├── src/
│   ├── config/
│   ├── controllers/
│   │   ├── auth/
│   │   ├── create/
│   │   ├── delete/
│   │   ├── retrieve/
│   │   └── update/
│   ├── helpers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── validators/
│   └── server.js
├── .env
├── package.json
└── README.md
```

### Important Backend Folders

- `src/config`: Database connection setup
- `src/controllers`: Request handlers for auth, project, and task operations
- `src/middleware`: JWT authentication middleware
- `src/models`: Mongoose models for users, projects, and tasks
- `src/routes`: Express route definitions
- `src/validators`: Request validation rules
- `src/utils`: Utility helpers such as JWT token generation

## API List

### Base Routes

- `GET /` - Basic backend status response
- `GET /api/health` - Health check endpoint

### Authentication Routes

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Authenticate a user and return a token
- `POST /api/auth/logout` - Log out the authenticated user
- `GET /api/auth/profile` - Get the authenticated user profile

### Project Routes

- `POST /api/projects/project` - Create a project
- `GET /api/projects/project` - Retrieve all projects for the authenticated user
- `DELETE /api/projects/project/:projectId` - Delete a project

### Task Routes

- `POST /api/tasks/task` - Create a task
- `GET /api/tasks/task` - Retrieve all tasks for the authenticated user
- `PATCH /api/tasks/task/:taskId` - Update a task
- `DELETE /api/tasks/task/:taskId` - Delete a task

## Authentication

- Protected routes require an `Authorization` header in this format:

```text
Bearer <token>
```

- Tokens are verified using `JWT_SECRET`.
- The authenticated user is attached to `req.user` by the auth middleware.

## Response Format

Most API responses follow this structure:

```json
{
  "success": true,
  "message": "Descriptive message",
  "data": {}
}
```
