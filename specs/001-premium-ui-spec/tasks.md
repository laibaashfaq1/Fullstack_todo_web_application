# Tasks: Frontend UI for Hackathon II Phase II Todo App

**Input**: Design documents from `/specs/001-premium-ui-spec/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: This task list does not include explicit test tasks as they were not explicitly requested in the feature specification or for TDD approach. Testing will be implicitly part of validating each implementation task.

**Organization**: Tasks are grouped by logical phases derived from the implementation roadmap in `plan.md`, interpreted as user stories to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Paths shown below assume the web app structure: `frontend/` is the root for all frontend files.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic configuration for the frontend application.

- [ ] T001 Create a new Next.js 16+ project within `frontend/` directory if not already initialized
- [ ] T002 Configure Tailwind CSS within `frontend/tailwind.config.ts` including custom themes, glassmorphism utilities, and shadow presets
- [ ] T003 [P] Integrate Google Fonts (Inter or Manrope) using `next/font` in `frontend/app/layout.tsx` and global CSS
- [ ] T004 Install core frontend dependencies: `framer-motion`, `sonner`, `lucide-react`, `react-query` (or `SWR`), `next-themes` in `frontend/package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish core authentication mechanisms and global layout protection required before any task-specific UI can be built.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Implement `httpOnly` cookie-based JWT handling in `frontend/lib/auth.ts` (for client-side functions)
- [ ] T006 Create a central API client `frontend/lib/api.ts` responsible for attaching JWTs to all authenticated requests and handling global error responses
- [ ] T007 Develop Next.js middleware for route protection based on JWT validity in `frontend/middleware.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Auth Pages (Priority: US1)

**Goal**: Enable users to securely log in and sign up for the application.

**Independent Test**: Users can successfully navigate to and interact with login and signup forms, submit valid credentials, and receive appropriate feedback (success/error).

### Implementation for User Story 1

- [ ] T008 [P] [US1] Create Login page component in `frontend/app/auth/login/page.tsx` with email/password input and form validation
- [ ] T009 [P] [US1] Create Signup page component in `frontend/app/auth/signup/page.tsx` with email/password/confirm password input and form validation
- [ ] T010 [P] [US1] Implement password visibility toggle for auth input fields in `frontend/components/ui/password-input.tsx`
- [ ] T011 [US1] Integrate Login form with `/api/auth/login` endpoint via `frontend/lib/api.ts`
- [ ] T012 [US1] Integrate Signup form with `/api/auth/signup` endpoint via `frontend/lib/api.ts`
- [ ] T013 [US1] Implement redirection logic post-authentication to `/dashboard`

**Checkpoint**: At this point, User Story 1 (Auth Pages) should be fully functional and testable independently

---

## Phase 4: User Story 2 - Protected Dashboard Layout & Navigation (Priority: US2)

**Goal**: Provide a protected, responsive dashboard layout with navigation that adapts to device size.

**Independent Test**: Authenticated users are redirected to `/dashboard` and see the main layout with working navigation. Unauthenticated users are redirected to `/auth/login`.

### Implementation for User Story 2

- [ ] T014 [US2] Create protected dashboard layout in `frontend/app/dashboard/layout.tsx`
- [ ] T015 [P] [US2] Develop `Sidebar` navigation component in `frontend/components/Sidebar.tsx` for desktop views
- [ ] T016 [P] [US2] Develop `MobileNav` bottom navigation component in `frontend/components/MobileNav.tsx` for mobile views
- [ ] T017 [US2] Implement responsive logic to toggle between `Sidebar` and `MobileNav` based on screen size in `frontend/app/layout.tsx`
- [ ] T018 [US2] Integrate user information display in dashboard header (e.g., placeholder or fetched user data)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Task List Page with Loading States (Priority: US3)

**Goal**: Display a list of tasks for the authenticated user with elegant loading feedback.

**Independent Test**: Authenticated users can view their tasks. While tasks are loading, an elegant skeleton UI is displayed.

### Implementation for User Story 3

- [ ] T019 [US3] Develop `Dashboard` main content area in `frontend/app/dashboard/page.tsx` to fetch and display task data
- [ ] T020 [US3] Implement client-side data fetching for tasks using `react-query` in `frontend/hooks/useTasks.ts`
- [ ] T021 [P] [US3] Create skeleton loading UI for task lists in `frontend/components/TaskSkeleton.tsx`
- [ ] T022 [US3] Integrate skeleton loading into `frontend/app/dashboard/page.tsx` for initial data fetch and re-fetches
- [ ] T023 [P] [US3] Implement graceful empty state UI for when a user has no tasks

**Checkpoint**: User Stories 1, 2, and 3 should now be independently functional

---

## Phase 6: User Story 4 - Task Card Component (Priority: US4)

**Goal**: Render individual task items as interactive, animated cards.

**Independent Test**: A single task card can be rendered, displaying correct data, responding to hover effects, and toggling completion status.

### Implementation for User Story 4

- [ ] T024 [P] [US4] Create `TaskCard` component in `frontend/components/TaskCard.tsx` to display task details (title, description, due date, priority, status)
- [ ] T025 [US4] Implement hover animations (lift and shadow effect) for `TaskCard` using Framer Motion
- [ ] T026 [P] [US4] Design and implement dynamic status and priority badges within `TaskCard`
- [ ] T027 [US4] Integrate task completion checkbox with optimistic updates via `react-query` mutations in `frontend/components/TaskCard.tsx`
- [ ] T028 [US4] Add Edit and Delete action icons to `TaskCard` (wire-up functionality to open modal/dialog later)

**Checkpoint**: User Stories 1, 2, 3, and 4 should now be independently functional

---

## Phase 7: User Story 5 - Add/Edit Task Modal (Priority: US5)

**Goal**: Allow users to create new tasks and edit existing ones via a modern glassmorphism modal.

**Independent Test**: Users can open the modal, fill in form fields, submit new tasks, and save changes to existing tasks. Input validation provides immediate feedback.

### Implementation for User Story 5

- [ ] T029 [US5] Create `TaskFormModal` component in `frontend/components/TaskFormModal.tsx` with glassmorphism styling
- [ ] T030 [P] [US5] Implement form fields (Title, Description, Due Date Picker, Priority dropdown) within `TaskFormModal`
- [ ] T031 [P] [US5] Implement client-side form validation for `TaskFormModal` inputs
- [ ] T032 [US5] Integrate `TaskFormModal` for creating new tasks with `POST /api/{user_id}/tasks` endpoint via `frontend/lib/api.ts` and `react-query`
- [ ] T033 [US5] Integrate `TaskFormModal` for editing existing tasks (pre-filling fields) with `PUT /api/{user_id}/tasks/{id}` endpoint via `frontend/lib/api.ts` and `react-query`
- [ ] T034 [US5] Implement modal open/close logic (via external trigger and internal close button/escape key)

**Checkpoint**: User Stories 1-5 should now be independently functional

---

## Phase 8: User Story 6 - Floating Action Button (Priority: US6)

**Goal**: Provide a prominent, animated button for quick task creation.

**Independent Test**: Clicking the FAB opens the Add/Edit Task Modal. The FAB has a subtle micro-animation.

### Implementation for User Story 6

- [ ] T035 [P] [US6] Create `FAB` component in `frontend/components/FAB.tsx`
- [ ] T036 [US6] Implement micro-animations for the `FAB` using Framer Motion (e.g., subtle hover effect)
- [ ] T037 [US6] Integrate `FAB` into the `app/dashboard/layout.tsx` to ensure its presence across dashboard pages
- [ ] T038 [US6] Wire up `FAB` to trigger the `TaskFormModal` for new task creation

**Checkpoint**: User Stories 1-6 should now be independently functional

---

## Phase 9: User Story 7 - Dark Mode Toggle (Priority: US7)

**Goal**: Allow users to switch between dark and light themes seamlessly.

**Independent Test**: Toggling the dark mode switch correctly changes the application's theme.

### Implementation for User Story 7

- [ ] T039 [P] [US7] Configure `next-themes` in `frontend/app/providers.tsx` to manage theme state
- [ ] T040 [P] [US7] Implement `DarkModeToggle` component in `frontend/components/DarkModeToggle.tsx`
- [ ] T041 [US7] Integrate `DarkModeToggle` into the dashboard header/sidebar in `frontend/components/Sidebar.tsx` or `frontend/components/MobileNav.tsx`
- [ ] T042 [US7] Ensure all custom Tailwind CSS styles respond correctly to theme changes

**Checkpoint**: User Stories 1-7 should now be independently functional

---

## Phase 10: User Story 8 - Final Polish: Toasts & Error States (Priority: US8)

**Goal**: Provide user-friendly feedback for all operations and robust error handling.

**Independent Test**: Successful and failed operations trigger appropriate, non-intrusive toast notifications. UI gracefully handles API errors.

### Implementation for User Story 8

- [ ] T043 [P] [US8] Integrate `Sonner` for toast notifications in `frontend/app/layout.tsx` (or `providers.tsx`)
- [ ] T044 [US8] Implement success toasts for task creation, update, delete, and completion in `frontend/lib/api.ts` and relevant components
- [ ] T045 [US8] Implement error toasts for failed API calls and form submissions in `frontend/lib/api.ts` and relevant components
- [ ] T046 [US8] Develop global error boundaries or client-side error handling strategies for unexpected UI errors in `frontend/app/error.tsx`
- [ ] T047 [US8] Refine input validation feedback for all forms

**Checkpoint**: User Stories 1-8 should now be independently functional

---

## Phase 11: User Story 9 - Final Polish: Responsiveness & Animations (Priority: US9)

**Goal**: Ensure the application is pixel-perfect responsive across devices and all animations are smooth and purposeful.

**Independent Test**: The application renders correctly and is fully functional on various screen sizes (mobile, tablet, desktop). All specified micro-animations and transitions are smooth.

### Implementation for User Story 9

- [ ] T048 [P] [US9] Conduct comprehensive responsiveness testing across all key screens and components in `frontend/`
- [ ] T049 [US9] Adjust Tailwind breakpoints and component layouts as needed for optimal mobile-first experience
- [ ] T050 [P] [US9] Review and fine-tune all Framer Motion animations for smoothness and performance
- [ ] T051 [P] [US9] Conduct accessibility audit, ensuring ARIA labels and keyboard navigation are functional
- [ ] T052 [US9] Perform final visual QA to ensure premium aesthetic, glassmorphism, gradients, and shadows are consistent

---

## Dependencies & Execution Order

### Phase Dependencies

-   **Setup (Phase 1)**: No dependencies - can start immediately.
-   **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
-   **User Stories (Phase 3-11)**: All depend on Foundational phase completion.
    -   User stories can then proceed in parallel (if staffed).
    -   Or sequentially in priority order (US1 → US2 → ... → US9).
-   **Polish (Phase 10-11)**: Depends on all desired user stories being largely complete.

### User Story Dependencies

-   **US1 (Auth Pages)**: Can start after Foundational (Phase 2) - No dependencies on other stories.
-   **US2 (Protected Dashboard Layout)**: Depends on US1 (Auth) for successful redirection post-login. Can start in parallel with US1 if Auth mock/stub is available.
-   **US3 (Task List Page)**: Depends on US2 (Dashboard Layout) for displaying tasks within the layout.
-   **US4 (Task Card Component)**: Depends on US3 (Task List Page) for displaying individual cards within the list.
-   **US5 (Add/Edit Task Modal)**: Depends on US4 (Task Card) for triggering edits, and US6 (FAB) for new task creation.
-   **US6 (Floating Action Button)**: Depends on US5 (Add/Edit Task Modal) to trigger. Can be developed in parallel with a mock modal.
-   **US7 (Dark Mode Toggle)**: Can be implemented largely in parallel with other UI components.
-   **US8 (Final Polish: Toasts & Error States)**: Best integrated after core features are functional, as it provides feedback for those features.
-   **US9 (Final Polish: Responsiveness & Animations)**: Best performed after all core UI components are implemented and integrated.

### Within Each User Story

-   Implementation tasks should generally follow a component-first approach: UI components first, then integrate with API via `lib/api.ts`.
-   Verify functionality after each major task or component integration.

### Parallel Opportunities

-   All Setup tasks marked [P] can run in parallel.
-   Within each user story, tasks marked [P] can run in parallel.
-   Once the Foundational phase completes, several user stories (e.g., US1, US7) can begin in parallel. With proper planning, US2-US6 can also have overlapping development, especially if stubs/mocks are used.

---

## Parallel Example: User Story 1 (Auth Pages)

```bash
# Tasks that can run in parallel for US1:
- [ ] T008 [P] [US1] Create Login page component in frontend/app/auth/login/page.tsx
- [ ] T009 [P] [US1] Create Signup page component in frontend/app/auth/signup/page.tsx
- [ ] T010 [P] [US1] Implement password visibility toggle for auth input fields in frontend/components/ui/password-input.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 - Auth Pages)

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3.  Complete Phase 3: User Story 1 (Auth Pages)
4.  **STOP and VALIDATE**: Test User Story 1 independently (user can signup/login).
5.  Deploy/demo if ready.

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready
2.  Add User Story 1 (Auth Pages) → Test independently → Deploy/Demo
3.  Add User Story 2 (Protected Dashboard Layout) → Test independently → Deploy/Demo
4.  Continue adding user stories incrementally (US3, US4, etc.), testing each independently before deploying/demoing.

### Parallel Team Strategy

With multiple developers:

1.  Team completes Setup + Foundational together.
2.  Once Foundational is done:
    -   Developer A: User Story 1 (Auth Pages)
    -   Developer B: User Story 2 (Protected Dashboard Layout)
    -   Developer C: User Story 7 (Dark Mode Toggle)
3.  Stories complete and integrate independently, with careful coordination for dependent stories.

---

## Notes

-   [P] tasks = different files, often no direct code dependencies (e.g., UI component definitions).
-   [Story] label maps task to specific user story for traceability.
-   Each user story should be independently completable and testable to the extent possible.
-   Commit after each task or logical group.
-   Stop at any checkpoint to validate a story independently.
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence without clear justification.
