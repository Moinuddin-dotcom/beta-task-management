```md
# Project & Task Management Portal

A full-stack Project & Task Management Portal built with Next.js, Express.js, PostgreSQL, and Prisma.

The application allows users to create, view, update, delete, and manage tasks through a responsive interface with drag-and-drop support.

## Features

- Create, view, update, and delete tasks
- Task priority: Low, Medium, High
- Task status: Pending, In Progress, Completed
- Drag and drop tasks between status columns
- Reorder tasks within columns
- Form validation
- Loading states
- Error handling
- Success and error notifications
- Delete confirmation
- Empty states
- Responsive design
- RESTful API
- PostgreSQL database with Prisma ORM

## Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Axios
- React Hook Form
- Zod
- @hello-pangea/dnd

### Backend
- Node.js
- Express.js
- TypeScript
- Zod
- Prisma ORM

### Database
- PostgreSQL

### Infrastructure
- Docker
- Docker Compose
- pnpm

## Project Structure

```text
FSD-AAI-task-app/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── service/
│   └── types/
│
├── backend/
│   ├── prisma/
│   │   └── migrations/
│   └── src/
│       ├── controllers/
│       ├── lib/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       └── validation/
│
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Node.js 22+
- pnpm 10+
- Docker Desktop

## Setup

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd FSD-AAI-task-app
```

### 2. Start PostgreSQL

```bash
docker compose up -d
```

### 3. Backend Environment

Create `backend/.env`:

```env
DATABASE_URL="postgresql://task_user:task_password@localhost:5433/task_management"
PORT=5000
```

### 4. Frontend Environment

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 5. Install Backend Dependencies

```bash
cd backend
pnpm install
```

### 6. Setup Prisma

```bash
pnpm prisma generate
pnpm prisma migrate deploy
```

### 7. Start Backend

```bash
pnpm dev
```

Backend:

```text
http://localhost:5000
```

API:

```text
http://localhost:5000/api
```

### 8. Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend
pnpm install
```

### 9. Start Frontend

```bash
pnpm dev
```

Frontend:

```text
http://localhost:3000
```

## Environment Variables

### Backend `.env.example`

```env
DATABASE_URL="postgresql://task_user:task_password@localhost:5433/task_management"
PORT=5000
```

### Frontend `.env.example`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## API Endpoints

Base URL:

```text
http://localhost:5000/api
```

| Method | Endpoint | Description |
|---|---|---|
| POST | `/tasks` | Create a task |
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get a task by ID |
| PATCH | `/tasks/:id` | Update a task |
| PATCH | `/tasks/reorder` | Move/reorder a task |
| DELETE | `/tasks/:id` | Delete a task |

## Task Fields

| Field | Type | Values |
|---|---|---|
| Title | String | Required |
| Description | String | Required |
| Priority | Enum | LOW, MEDIUM, HIGH |
| Status | Enum | PENDING, IN_PROGRESS, COMPLETED |
| Created Date | DateTime | Automatically generated |

## Database

The application uses PostgreSQL with Prisma ORM.

Database migrations are included in:

```text
backend/prisma/migrations/
```

## Validation & Error Handling

The application includes:

- Client-side form validation
- Server-side request validation
- API error handling
- Database error handling
- Loading states
- Success/error notifications
- Empty states
- Delete confirmation

## Docker

Start PostgreSQL:

```bash
docker compose up -d
```

Stop PostgreSQL:

```bash
docker compose down
```

## Type Checking

Frontend:

```bash
cd frontend
pnpm tsc --noEmit
```

Backend:

```bash
cd backend
pnpm tsc --noEmit
```
```

### `backend/.env.example`

```env
DATABASE_URL="postgresql://task_user:task_password@localhost:5433/task_management"
PORT=5000
```

### `frontend/.env.example`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
