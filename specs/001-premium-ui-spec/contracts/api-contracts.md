# Frontend API Contracts - Hackathon II Phase II Todo App

This document outlines the expected API contracts for communication between the frontend and the FastAPI backend. It details the endpoints, request payloads, and expected response structures for core functionalities and authentication. All requests to protected endpoints MUST include a valid JWT in an `Authorization: Bearer <token>` header, typically managed via `httpOnly` cookies from the frontend.

## 1. Authentication Endpoints

### 1.1 User Login
-   **Endpoint:** `POST /api/auth/login`
-   **Description:** Authenticates a user and issues a JWT.
-   **Request Body (application/json):**
    ```json
    {
      "email": "user@example.com",
      "password": "secure_password"
    }
    ```
-   **Successful Response (200 OK, application/json):**
    ```json
    {
      "access_token": "jwt_token_string",
      "token_type": "bearer",
      "user_id": "uuid_of_user"
    }
    ```
-   **Error Response (401 Unauthorized, application/json):**
    ```json
    {
      "detail": "Invalid credentials"
    }
    ```

### 1.2 User Signup
-   **Endpoint:** `POST /api/auth/signup`
-   **Description:** Registers a new user and issues a JWT.
-   **Request Body (application/json):**
    ```json
    {
      "email": "newuser@example.com",
      "password": "new_secure_password"
    }
    ```
-   **Successful Response (201 Created, application/json):**
    ```json
    {
      "access_token": "jwt_token_string",
      "token_type": "bearer",
      "user_id": "uuid_of_new_user"
    }
    ```
-   **Error Response (409 Conflict, application/json):**
    ```json
    {
      "detail": "Email already registered"
    }
    ```

## 2. Task Management Endpoints

### 2.1 List All Tasks for User
-   **Endpoint:** `GET /api/{user_id}/tasks`
-   **Description:** Retrieves a list of all tasks for the authenticated user. `{user_id}` in the path should match the authenticated user's ID.
-   **Successful Response (200 OK, application/json):**
    ```json
    [
      {
        "id": "uuid-task-1",
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "due_date": "2026-01-10T00:00:00Z",
        "priority": "high",
        "status": "pending",
        "user_id": "uuid_of_user"
      },
      {
        "id": "uuid-task-2",
        "title": "Walk the dog",
        "description": null,
        "due_date": null,
        "priority": "medium",
        "status": "completed",
        "user_id": "uuid_of_user"
      }
    ]
    ```
-   **Error Response (401 Unauthorized/403 Forbidden, application/json):**
    ```json
    {
      "detail": "Not authenticated"
    }
    ```

### 2.2 Create New Task
-   **Endpoint:** `POST /api/{user_id}/tasks`
-   **Description:** Creates a new task for the authenticated user. `{user_id}` in the path should match the authenticated user's ID.
-   **Request Body (application/json):**
    ```json
    {
      "title": "New Task Title",
      "description": "Optional details about the task.",
      "due_date": "2026-01-15T10:00:00Z",
      "priority": "low",
      "status": "pending"
    }
    ```
-   **Successful Response (201 Created, application/json):**
    ```json
    {
      "id": "uuid-new-task",
      "title": "New Task Title",
      "description": "Optional details about the task.",
      "due_date": "2026-01-15T10:00:00Z",
      "priority": "low",
      "status": "pending",
      "user_id": "uuid_of_user"
    }
    ```
-   **Error Response (400 Bad Request, application/json):**
    ```json
    {
      "detail": "Validation error: Title is required"
    }
    ```

### 2.3 Get Task Details
-   **Endpoint:** `GET /api/{user_id}/tasks/{id}`
-   **Description:** Retrieves details of a specific task by its ID. `{user_id}` in the path should match the authenticated user's ID.
-   **Successful Response (200 OK, application/json):**
    ```json
    {
      "id": "uuid-task-1",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "due_date": "2026-01-10T00:00:00Z",
      "priority": "high",
      "status": "pending",
      "user_id": "uuid_of_user"
    }
    ```
-   **Error Response (404 Not Found, application/json):**
    ```json
    {
      "detail": "Task not found"
    }
    ```

### 2.4 Update Task
-   **Endpoint:** `PUT /api/{user_id}/tasks/{id}`
-   **Description:** Updates an existing task by its ID. `{user_id}` in the path should match the authenticated user's ID.
-   **Request Body (application/json):** (All fields are optional for partial updates, but provided fields will completely replace existing values).
    ```json
    {
      "title": "Updated Task Title",
      "description": "New description",
      "due_date": "2026-01-11T00:00:00Z",
      "priority": "medium",
      "status": "completed"
    }
    ```
-   **Successful Response (200 OK, application/json):**
    ```json
    {
      "id": "uuid-task-1",
      "title": "Updated Task Title",
      "description": "New description",
      "due_date": "2026-01-11T00:00:00Z",
      "priority": "medium",
      "status": "completed",
      "user_id": "uuid_of_user"
    }
    ```
-   **Error Response (404 Not Found, application/json):**
    ```json
    {
      "detail": "Task not found"
    }
    ```

### 2.5 Delete Task
-   **Endpoint:** `DELETE /api/{user_id}/tasks/{id}`
-   **Description:** Deletes a specific task by its ID. `{user_id}` in the path should match the authenticated user's ID.
-   **Successful Response (204 No Content):** (Empty body)
-   **Error Response (404 Not Found, application/json):**
    ```json
    {
      "detail": "Task not found"
    }
    ```

### 2.6 Toggle Task Completion
-   **Endpoint:** `PATCH /api/{user_id}/tasks/{id}/complete`
-   **Description:** Toggles the completion status of a task. `{user_id}` in the path should match the authenticated user's ID.
-   **Request Body (application/json):**
    ```json
    {
      "completed": true
    }
    ```
-   **Successful Response (200 OK, application/json):**
    ```json
    {
      "id": "uuid-task-1",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "due_date": "2026-01-10T00:00:00Z",
      "priority": "high",
      "status": "completed",
      "user_id": "uuid_of_user"
    }
    ```
-   **Error Response (404 Not Found, application/json):**
    ```json
    {
      "detail": "Task not found"
    }
    ```