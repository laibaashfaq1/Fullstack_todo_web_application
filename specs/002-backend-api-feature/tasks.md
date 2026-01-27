# Task Breakdown: Backend API Feature

This document breaks down the implementation of the Backend API into actionable, dependency-ordered tasks.

## Phase 1: Project Setup
*Independent test criteria: The project structure is created, dependencies are installed, and the application can run without errors.*

- [X] T001 Create the main backend application directory `backend/`.
- [X] T002 Create a `requirements.txt` file in `backend/` with all necessary dependencies (fastapi, uvicorn, sqlmodel, python-dotenv, python-jose[pycryptodome]).
- [X] T003 Create a `.env` file in `backend/` and add placeholders for `DATABASE_URL` and `BETTER_AUTH_SECRET`.
- [X] T004 Create the application subdirectories: `backend/app/`, `backend/app/models/`, `backend/app/routes/`, `backend/app/utils/`.

## Phase 2: Foundational Components
*Independent test criteria: The database connection is established successfully, and the main FastAPI application object is initialized.*

- [X] T005 [P] Implement the database connection logic in `backend/app/database.py` to create and manage database sessions.
- [X] T006 [P] Create the main application file `backend/app/main.py` and initialize the FastAPI app instance.
- [X] T007 Define the `Task` model in `backend/app/models/task.py` as per the data model specification.

## Phase 3: User Story 1 - Core Task Creation and Retrieval
*User Story Goal: As a user, I want to create a task and retrieve it by its ID.*
*Independent test criteria: A new task can be created via a POST request, and the created task can be fetched via a GET request to its specific URL. Both endpoints are protected.*

- [X] T008 [P] [US1] Implement the JWT verification dependency (`get_current_user`) in `backend/app/security.py`.
- [X] T009 [US1] Create the API router in `backend/app/routes/tasks.py`.
- [X] T010 [US1] Implement the `POST /api/tasks` endpoint in `backend/app/routes/tasks.py` for creating a new task.
- [X] T011 [US1] Implement the `GET /api/tasks/{id}` endpoint in `backend/app/routes/tasks.py` to fetch a single task.
- [X] T012 [US1] Include the tasks router in the main FastAPI app in `backend/app/main.py`.

## Phase 4: User Story 2 - Task Listing and Filtering
*User Story Goal: As a user, I want to list all my tasks and be able to filter and sort them.*
*Independent test criteria: The `GET /api/tasks` endpoint returns a list of tasks owned by the user, and the `status` and `sort` query parameters function correctly.*

- [X] T013 [US2] Implement the `GET /api/tasks` endpoint in `backend/app/routes/tasks.py` to list all tasks for the current user.
- [X] T014 [US2] Add filtering logic to the `GET /api/tasks` endpoint based on the `status` query parameter.
- [X] T015 [US2] Add sorting logic to the `GET /api/tasks` endpoint based on the `sort` query parameter.

## Phase 5: User Story 3 - Task Modification
*User Story Goal: As a user, I want to update the details of my tasks and mark them as complete.*
*Independent test criteria: The `PUT /api/tasks/{id}` endpoint correctly updates a task's title/description. The `PATCH /api/tasks/{id}/complete` endpoint correctly toggles the task's completion status.*

- [X] T016 [US3] Implement the `PUT /api/tasks/{id}` endpoint in `backend/app/routes/tasks.py` to update a task's details.
- [X] T017 [US3] Implement the `PATCH /api/tasks/{id}/complete` endpoint in `backend/app/routes/tasks.py` to toggle the `completed` status.

## Phase 6: User Story 4 - Task Deletion
*User Story Goal: As a user, I want to delete a task I no longer need.*
*Independent test criteria: The `DELETE /api/tasks/{id}` endpoint successfully removes a task from the database.*

- [X] T018 [US4] Implement the `DELETE /api/tasks/{id}` endpoint in `backend/app/routes/tasks.py` to delete a task.

## Phase 7: Polish & Cross-Cutting Concerns
*Independent test criteria: The API returns consistent and structured error messages for various error conditions.*

- [X] T019 [P] Implement centralized error handlers in `backend/app/utils/error_handlers.py` for 401, 403, 404, and 422 errors.
- [X] T020 [P] Integrate the error handlers into the main FastAPI application in `backend/app/main.py`.
- [X] T021 Create initial tests for the API endpoints in a new `backend/tests/` directory.

## Dependencies & Execution Order
1.  **Phase 1 (Setup)** must be completed first.
2.  **Phase 2 (Foundational)** can begin after Phase 1. The tasks within are parallelizable.
3.  **Phase 3 (US1)** depends on Phase 2.
4.  **Phase 4 (US2)**, **Phase 5 (US3)**, and **Phase 6 (US4)** depend on Phase 3. They can be implemented in parallel with each other.
5.  **Phase 7 (Polish)** can be worked on in parallel with Phases 3-6 but should be finalized after all core functionality is complete.

## Implementation Strategy
The implementation will follow an MVP-first approach, focusing on delivering end-to-end functionality for one user story at a time. The suggested order is as defined in the phases above, which ensures that foundational components are built before dependent features. This allows for incremental testing and integration.