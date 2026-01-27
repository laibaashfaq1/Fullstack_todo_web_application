<!--
Sync Impact Report:
Version change: None → 1.0.0
Modified principles: None
Added sections: All sections
Removed sections: None
Templates requiring updates:
- .specify/templates/plan-template.md: ⚠ pending
- .specify/templates/spec-template.md: ⚠ pending
- .specify/templates/tasks-template.md: ⚠ pending
- .specify/templates/adr-template.md: ⚠ pending
- .specify/templates/checklist-template.md: ⚠ pending
- .specify/templates/phr-template.prompt.md: ⚠ pending
- .specify/templates/agent-file-template.md: ⚠ pending
- All command files in .specify/commands/: ⚠ pending
- README.md: ⚠ pending
- docker-compose.yml: ⚠ pending
Follow-up TODOs: None
-->
# Hackathon II Phase II: Todo Full-Stack Web Application - CONSTITUTION

## 1. Project Overview & Purpose
This project aims to transform the Phase I console-based Todo application into a modern, multi-user web application. The core purpose is to provide a robust and scalable solution for managing personal tasks, leveraging persistent storage in Neon Serverless PostgreSQL and a secure authentication mechanism.

## 2. Guiding Principles
Our development will adhere to the following non-negotiable principles:

- **Clean Code:** All code MUST be readable, maintainable, and self-documenting. Complex logic requires explicit comments.
- **Modular Design:** Components and services MUST be designed with clear separation of concerns, promoting reusability and simplifying maintenance.
- **Secure User Data Isolation:** User data MUST be strictly isolated, ensuring that users can only access and manage their own tasks. JWT will enforce this isolation at the API level.
- **Minimal Dependencies:** We MUST strive to keep external dependencies to a minimum to reduce complexity, improve security, and streamline deployment.
- **Python 3.13+:** All Python-based development MUST target Python 3.13 or newer.
- **TypeScript:** Frontend development MUST utilize TypeScript for enhanced code quality, type safety, and developer experience.

## 3. Core Constraints & Technology Stack
The project is built upon a specific technology stack and operates under defined constraints:

- **Frontend:** Next.js 16+ (App Router)
- **Backend:** Python FastAPI with SQLModel ORM
- **Database:** Neon Serverless PostgreSQL
- **Authentication:** Better Auth for frontend token issuance, with FastAPI backend verifying JWTs.

**API Endpoints:**
The following RESTful API endpoints MUST be implemented:
- `GET /api/{user_id}/tasks`: Retrieve all tasks for a specific user.
- `POST /api/{user_id}/tasks`: Create a new task for a specific user.
- `GET /api/{user_id}/tasks/{id}`: Retrieve details of a specific task by its ID for a given user.
- `PUT /api/{user_id}/tasks/{id}`: Update an existing task by its ID for a given user.
- `DELETE /api/{user_id}/tasks/{id}`: Delete a specific task by its ID for a given user.
- `PATCH /api/{user_id}/tasks/{id}/complete`: Toggle the completion status of a specific task for a given user.

## 4. Scope & Features
The initial scope focuses on delivering a Minimum Viable Product (MVP) with core functionality:

- **Core Features:** Implementation of the five basic task management operations:
    - Add new tasks
    - View existing tasks
    - Update task details
    - Delete tasks
    - Mark tasks as complete/incomplete
- **Scope:** The MVP MUST include full authentication and the five core task management features implemented as a responsive frontend interacting with a RESTful API.

## 5. Multi-Agent Development Workflow (Gemini-based)
Development will follow a Spec-driven approach utilizing a multi-agent system powered by Gemini:

- **Orchestrator Agent:** Manages the overall development process.
- **Specialized Agents:** Frontend, Backend, Database, Authentication, and Testing agents will handle specific domain tasks.
- **Skills:** Agents will leverage defined skills for recurring tasks and integrations.

## 6. Monorepo Structure & Key Files
The project will be organized as a monorepo to streamline development and maintain consistency:

- `frontend/`: Contains the Next.js application.
- `backend/`: Contains the Python FastAPI application.
- `specs/`: Houses all specification documents, including feature specs, plans, and task breakdowns.
- `.spec-kit/config.yaml`: Configuration for Spec-Kit tooling.
- Agent-specific documentation: `CLAUDE.md`-like files for each agent.
- `agents/`: Directory containing agent definitions and configurations.
- `skills/`: Directory containing reusable skills for agents.

## 7. Deliverables & Success Criteria
Successful completion of the project is defined by the following deliverables and criteria:

**Deliverables:**
- A functional GitHub repository containing:
    - Complete source code for `frontend/` and `backend/`.
    - Comprehensive `specs/` history.
    - `agents/` and `skills/` directories with their respective contents.
    - A `README.md` file with clear setup and run instructions.
    - A `docker-compose.yml` file for easy local development and deployment.

**Success Criteria:**
- The entire application (frontend, backend, database) MUST run successfully via `docker-compose`.
- Users MUST be able to sign up, log in, and securely manage ONLY their own tasks.
- All task data MUST persist correctly in the Neon Serverless PostgreSQL database.
- All API endpoints MUST be secured by JWT, with each request filtered by the authenticated `user_id`.

## Governance
This Constitution outlines the foundational principles and agreements for the "Hackathon II Phase II: Todo Full-Stack Web Application" project. It supersedes all other informal practices or agreements.

**Amendment Procedure:** Any amendments to this Constitution MUST be proposed, documented, and approved by the project leads. A clear migration plan for any breaking changes MUST be outlined.
**Versioning Policy:** This Constitution follows semantic versioning (MAJOR.MINOR.PATCH).
**Compliance Review:** All pull requests and code reviews MUST verify adherence to the principles and constraints outlined in this document.

**Version**: 1.0.0 | **Ratified**: 2026-01-08 | **Last Amended**: 2026-01-08