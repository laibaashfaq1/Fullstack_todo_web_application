---
id: 20260108-0001
title: Hackathon II Phase II Todo App Constitution
stage: constitution
date: 2026-01-08
surface: agent
model: gemini-model
feature: none
branch: master
user: Laiba Ashfaq
command: /sp.constitution You are an expert in Spec-Kit Plus specification-driven development for hackathon projects. Generate the COMPLETE constitution.md file for **Hackathon II Phase II: Todo Full-Stack Web Application**. This constitution MUST strictly follow and reference the exact project document provided, including: - Project overview: Transform Phase I console Todo app into a modern multi-user web application with persistent storage in Neon Serverless PostgreSQL - Core features: Implement all 5 basic level features (Add, View, Update, Delete, Mark Complete) as RESTful API + responsive frontend - Authentication: Better Auth on frontend issuing JWT tokens; FastAPI backend verifies JWT for user isolation (every request filtered by authenticated user_id) - API Endpoints:   - GET /api/{user_id}/tasks (list all tasks for user) - POST /api/{user_id}/tasks (create new task) - GET /api/{user_id}/tasks/{id} (get task details) - PUT /api/{user_id}/tasks/{id} (update task) - DELETE /api/{user_id}/tasks/{id} (delete task) - PATCH /api/{user_id}/tasks/{id}/complete (toggle completion) - Technology Stack:   - Frontend: Next.js 16+ (App Router) - Backend: Python FastAPI + SQLModel ORM - Database: Neon Serverless PostgreSQL - Authentication: Better Auth with JWT - Monorepo organization: frontend/, backend/, specs/, .spec-kit/config.yaml, CLAUDE.md-like files - Workflow: Spec-driven using Gemini as multi-agent system (orchestrator + frontend/backend/db/auth/testing agents + skills) - Principles: Clean code, modular design, secure user data isolation, minimal dependencies, Python 3.13+, TypeScript - Scope: MVP with authentication + 5 core features - Deliverables: GitHub repo with specs history, agents/skills folders, README with setup/run instructions, docker-compose.yml - Success Criteria: App runs via docker-compose, users signup/login/manage only own tasks, data persists in Neon, JWT secures all endpoints Structure the constitution.md EXACTLY like this: # Hackathon II Phase II: Todo Full-Stack Web Application - CONSTITUTION ## 1. Project Overview & Purpose ## 2. Guiding Principles ## 3. Core Constraints & Technology Stack ## 4. Scope & Features ## 5. Multi-Agent Development Workflow (Gemini-based) ## 6. Monorepo Structure & Key Files ## 7. Deliverables & Success Criteria Keep it concise (600–800 words), professional, use bullets/tables/numbered lists where appropriate. Output ONLY the full constitution.md content – nothing else, no explanations, no chit-chat.
labels: ["constitution", "project-setup"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
- .specify/memory/constitution.md
tests:

---

## Prompt

/sp.constitution You are an expert in Spec-Kit Plus specification-driven development for hackathon projects.

Generate the COMPLETE constitution.md file for **Hackathon II Phase II: Todo Full-Stack Web Application**.

This constitution MUST strictly follow and reference the exact project document provided, including:

- Project overview: Transform Phase I console Todo app into a modern multi-user web application with persistent storage in Neon Serverless PostgreSQL
- Core features: Implement all 5 basic level features (Add, View, Update, Delete, Mark Complete) as RESTful API + responsive frontend
- Authentication: Better Auth on frontend issuing JWT tokens; FastAPI backend verifies JWT for user isolation (every request filtered by authenticated user_id)
- API Endpoints:
  - GET /api/{user_id}/tasks (list all tasks for user)
  - POST /api/{user_id}/tasks (create new task)
  - GET /api/{user_id}/tasks/{id} (get task details)
  - PUT /api/{user_id}/tasks/{id} (update task)
  - DELETE /api/{user_id}/tasks/{id} (delete task)
  - PATCH /api/{user_id}/tasks/{id}/complete (toggle completion)
- Technology Stack:
  - Frontend: Next.js 16+ (App Router)
  - Backend: Python FastAPI + SQLModel ORM
  - Database: Neon Serverless PostgreSQL
  - Authentication: Better Auth with JWT
- Monorepo organization: frontend/, backend/, specs/, .spec-kit/config.yaml, CLAUDE.md-like files
- Workflow: Spec-driven using Gemini as multi-agent system (orchestrator + frontend/backend/db/auth/testing agents + skills)
- Principles: Clean code, modular design, secure user data isolation, minimal dependencies, Python 3.13+, TypeScript
- Scope: MVP with authentication + 5 core features
- Deliverables: GitHub repo with specs history, agents/skills folders, README with setup/run instructions, docker-compose.yml
- Success Criteria: App runs via docker-compose, users signup/login/manage only own tasks, data persists in Neon, JWT secures all endpoints

Structure the constitution.md EXACTLY like this:

# Hackathon II Phase II: Todo Full-Stack Web Application - CONSTITUTION

## 1. Project Overview & Purpose

## 2. Guiding Principles

## 3. Core Constraints & Technology Stack

## 4. Scope & Features

## 5. Multi-Agent Development Workflow (Gemini-based)

## 6. Monorepo Structure & Key Files

## 7. Deliverables & Success Criteria

Keep it concise (600–800 words), professional, use bullets/tables/numbered lists where appropriate.
Output ONLY the full constitution.md content – nothing else, no explanations, no chit-chat.

## Response snapshot

Generated `constitution.md` based on provided project details, including project overview, principles, technology stack, scope, workflow, monorepo structure, deliverables, and success criteria. The constitution has been written to `.specify/memory/constitution.md` with version 1.0.0.

## Outcome

- ✅ Impact: Constitution document created/updated successfully.
- 🧪 Tests: No automated tests for constitution document.
- 📁 Files: `.specify/memory/constitution.md` created/updated.
- 🔁 Next prompts: User to review and approve constitution.
- 🧠 Reflection: Successfully interpreted user's request for constitution generation and filled the template with provided details. Handled placeholder replacement and versioning. PHR created after initial script failure fallback.

## Evaluation notes (flywheel)

- Failure modes observed: `create-phr.sh` script failed on Windows, requiring manual PHR creation.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Improve `create-phr.sh` for cross-platform compatibility or provide a PowerShell equivalent.
