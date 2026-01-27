# Backend Technical Implementation Plan - Hackathon II Phase II Todo App

## 1. Overview & Architecture Summary
This plan outlines the technical design for the Todo App's backend API. The architecture is built on FastAPI, leveraging its modern features for dependency injection and automatic documentation. The core logic is separated into distinct modules for routing, database models, and security to ensure a clean, maintainable codebase. Data flow is secured end-to-end, with a JWT middleware layer validating every request and ensuring strict user data isolation at the database level.

## 2. Technology & Tooling Decisions
- **FastAPI**: Latest stable version. Utilized for its high performance, async capabilities, and Pydantic integration for automatic request/response validation.
- **SQLModel**: Chosen as the ORM for its simplicity and direct mapping between database tables and Pydantic models, reducing code duplication.
- **Database**: Neon Serverless PostgreSQL, connected via a connection string stored in the `.env` file.
- **JWT Library**: `python-jose[pycryptodome]` will be used for its robust support of JWT standards (JWS, JWE, JWK) to decode and verify incoming tokens.
- **Dependency Management**: `uv` will be used for fast and efficient package installation and management.
- **Environment Variables**: `python-dotenv` will manage environment variables (e.g., `DATABASE_URL`, `BETTER_AUTH_SECRET`) loaded from a `.env` file.
- **Code Style**: Adherence to PEP 8 standards with strict type hinting, enforced by linting tools.

## 3. Core Components & Responsibilities
- **`main.py`**: The main application entry point. It will initialize the FastAPI app, include the API routers, and set up middleware.
- **`database.py`**: Manages the database connection and session lifecycle. It will provide a dependency (`get_db`) to be injected into repository functions.
- **`models/task.py`**: Defines the `Task` SQLModel class, representing the `tasks` table schema and serving as a Pydantic model.
- **`security.py`**: Contains the JWT authentication logic. It will provide a dependency (`get_current_user`) that verifies the token and extracts the user's identity.
- **`routes/tasks.py`**: Defines the API router for all task-related endpoints (`/api/tasks`). It will handle the business logic for all CRUD operations.
- **`utils/error_handlers.py`**: Implements custom exception handlers to produce consistent, structured JSON error responses for different HTTP statuses (401, 403, 404, 422).

## 4. Key Design Decisions
- **JWT Verification**: The `get_current_user` dependency will decode the `Authorization: Bearer <token>` header, validate the signature against the `BETTER_AUTH_SECRET`, and extract the `user_id` from the token payload.
- **User Isolation Strategy**: Every database query that accesses task data will be strictly filtered using the `user_id` obtained from the authenticated user's JWT. This is a non-negotiable security measure.
- **Database Session Management**: A single database session will be created per request using FastAPI's dependency injection system (`Depends(get_db)`). The session will be closed automatically after the request is complete.
- **Pagination & Sorting**: The `GET /api/tasks` endpoint will use query parameters (`skip`, `limit`, `sort`) with sensible defaults to implement pagination and sorting logic directly in the database query for efficiency.
- **Validation**: Pydantic models will be used for request body validation, path parameters, and response serialization, ensuring data integrity and consistency automatically.
- **Error Responses**: A centralized exception handling mechanism will catch specific exceptions and format them into a standard `{"detail": "error message"}` JSON response.
- **Performance**: Database indexes will be created on the `tasks.user_id` and `tasks.completed` columns to optimize query performance for common filtering operations.

## 5. Implementation Roadmap / High-Level Phases
1.  **Project & Database Setup**: Initialize the project structure, install dependencies with `uv`, and configure the database connection to Neon using `SQLModel` and the `DATABASE_URL`.
2.  **Model Definition**: Create the `Task` model in `models/task.py` with all required fields, types, and constraints as defined in the specification.
3.  **Authentication Layer**: Implement the JWT verification dependency in `security.py` to decode tokens and protect endpoints.
4.  **CRUD Endpoint Implementation**: Develop the `GET /api/tasks` and `POST /api/tasks` endpoints in `routes/tasks.py`, including request validation and user-isolated database logic.
5.  **Complete API Routes**: Implement the remaining `GET`, `PUT`, `DELETE`, and `PATCH` endpoints for individual tasks, ensuring all security and ownership checks are in place.
6.  **Error Handling & Testing**: Implement global error handlers for a consistent API response format and write unit/integration tests to validate all functionality and security constraints.

## 6. Alignment & Constraints Check
- This plan fully aligns with the `Backend Specification (specs/002-backend-api-feature/spec.md)`.
- It adheres to the project `constitution.md` by prioritizing security, maintainability, and using the prescribed technology stack.
- No significant trade-offs are being made; the initial implementation will include all core features, including pagination, as specified.

## 7. Validation Checklist
- [X] Covers all endpoints from spec
- [X] Enforces user isolation
- [X] Secure JWT verification
- [X] Ready for Neon DB connection
- [X] Prepares for integration with frontend
