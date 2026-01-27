# Backend Specification - Hackathon II Phase II Todo App

## 1. Overview & Purpose

This document specifies the backend API for the Hackathon II Phase II Todo Full-Stack Web Application. The backend will be responsible for managing tasks for multiple users, with a focus on security and data isolation. It will provide a RESTful interface for all CRUD (Create, Read, Update, Delete) operations on tasks. All access to the API will be protected by JWT authentication, ensuring that users can only access and manage their own tasks.

## 2. Core Domain Model

### Task Entity

The core entity of the system is the `Task`.

-   `id` (integer, primary key): Unique identifier for the task.
-   `user_id` (integer, foreign key): The ID of the user who owns the task. This will be used to enforce data isolation.
-   `title` (string, required): The title of the task. Max length: 255 characters.
-   `description` (string, optional): A more detailed description of the task.
-   `completed` (boolean, default: `false`): The completion status of the task.
-   `created_at` (datetime, auto-generated): The timestamp when the task was created.
-   `updated_at` (datetime, auto-generated): The timestamp when the task was last updated.

### User Relationship

-   Each `Task` must be associated with a `User`.
-   The `users` table is managed by the Better Auth service. The backend will rely on the `user_id` from the JWT to associate tasks with users.

## 3. Functional Requirements / API Endpoints

### EP-01: List Tasks (GET /api/tasks)

As a user, I want to list my tasks so that I can see what I need to do.

**Acceptance Criteria:**

1.  Returns an array of tasks belonging only to the authenticated user.
2.  Supports filtering by `status` query parameter (`all`, `pending`, `completed`).
3.  Supports sorting by `sort` query parameter (`created`, `title`).
4.  Returns `200 OK` with an array of task objects on success.
5.  Supports pagination if the number of tasks is large.

### EP-02: Create Task (POST /api/tasks)

As a user, I want to create a new task to keep track of something new I need to do.

**Acceptance Criteria:**

1.  Accepts a JSON payload with a `title` (required) and `description` (optional).
2.  Associates the new task with the authenticated user.
3.  Returns `201 Created` with the newly created task object on success.
4.  Returns `422 Unprocessable Entity` if the `title` is missing.

### EP-03: Get Task (GET /api/tasks/{id})

As a user, I want to get a single task to view its details.

**Acceptance Criteria:**

1.  Returns the details of the specified task.
2.  Returns `200 OK` with the task object on success.
3.  Returns `404 Not Found` if the task does not exist.
4.  Returns `403 Forbidden` if the task does not belong to the authenticated user.

### EP-04: Update Task (PUT /api/tasks/{id})

As a user, I want to update a task to change its details.

**Acceptance Criteria:**

1.  Accepts a JSON payload with a `title` and/or `description`.
2.  Updates the specified task with the new information.
3.  Returns `200 OK` with the updated task object on success.
4.  Returns `404 Not Found` if the task does not exist.
5.  Returns `403 Forbidden` if the task does not belong to the authenticated user.
6.  Returns `422 Unprocessable Entity` if the `title` is set to an empty value.

### EP-05: Delete Task (DELETE /api/tasks/{id})

As a user, I want to delete a task when I no longer need it.

**Acceptance Criteria:**

1.  Deletes the specified task from the database.
2.  Returns `204 No Content` on success.
3.  Returns `404 Not Found` if the task does not exist.
4.  Returns `403 Forbidden` if the task does not belong to the authenticated user.

### EP-06: Toggle Complete (PATCH /api/tasks/{id}/complete)

As a user, I want to mark a task as complete or incomplete.

**Acceptance Criteria:**

1.  Toggles the `completed` status of the specified task.
2.  Returns `200 OK` with the updated task object on success.
3.  Returns `404 Not Found` if the task does not exist.
4.  Returns `403 Forbidden` if the task does not belong to the authenticated user.

## 4. Non-Functional Requirements

-   **Authentication**: All endpoints must be protected and require a valid JWT from Better Auth. A `401 Unauthorized` error will be returned for missing or invalid tokens.
-   **Authorization & User Isolation**: The API must enforce that users can only access or modify their own tasks. A `403 Forbidden` error will be returned if a user attempts to access a task they do not own.
-   **Validation**: Input data must be validated. `title` is required for task creation and cannot be empty on update. Maximum lengths for string fields should be enforced.
-   **Error Handling**: The API should return standard HTTP status codes and a consistent JSON error format with a `detail` message. (e.g., `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `422 Unprocessable Entity`).
-   **Performance**: The database should have indexes on `user_id` and `completed` fields in the `tasks` table to ensure efficient querying.

## 5. Out of Scope for Backend MVP

-   Real-time updates (e.g., via WebSockets).
-   Advanced search capabilities (e.g., full-text search).
-   User management (this is handled by Better Auth).

## 6. Assumptions & Decisions

-   The frontend will acquire and manage the JWT from the Better Auth service. The backend's responsibility is to validate it.
-   The `DATABASE_URL` for the Neon serverless PostgreSQL database will be provided via a `.env` file.
-   The shared secret for JWT validation (`BETTER_AUTH_SECRET`) will be provided via a `.env` file.
-   `SQLModel` will be used as the ORM for defining data models and interacting with the database.
-   The `users` table is managed by the Better Auth service and is not the responsibility of this backend.

## 7. Validation Checklist

-   [ ] All endpoints are testable and have clear acceptance criteria.
-   [ ] The specification is consistent with the project constitution.
-   [ ] The specification covers both happy path and error scenarios for each endpoint.