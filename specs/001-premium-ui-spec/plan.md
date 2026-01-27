# Frontend Technical Implementation Plan - Hackathon II Phase II Todo App

## 1. Overview & Architecture Summary
The frontend will be built using Next.js 16+ App Router, leveraging a hybrid approach of Server and Client Components to optimize performance and user experience. The application's structure will follow conventional Next.js patterns, with route-based files in `app/` for pages and shared UI elements in `components/`. Data fetching will primarily utilize Server Components for initial loads and React Query for client-side mutations and real-time updates.

## 2. Technology & Tooling Decisions
-   **Next.js version & features used:** Next.js 16+ with App Router for routing, Server Components for data fetching and initial render, Client Components for interactivity.
-   **Styling (Tailwind + custom config):** Tailwind CSS for utility-first styling, extended with a custom configuration for design tokens, glassmorphism utilities, subtle gradients, and soft shadow presets, ensuring adherence to the premium aesthetic.
-   **Fonts (Google Fonts: Inter or Manrope):** Integration of Inter (or Manrope) from Google Fonts, self-hosted or optimized for performance via `next/font`.
-   **Animations (Framer Motion):** Framer Motion library for declarative, smooth micro-animations, page transitions, and interactive elements.
-   **Toasts (Sonner):** Sonner for modern, non-intrusive toast notifications, providing elegant user feedback.
-   **Icons (Lucide-react):** Lucide-react for a comprehensive and consistent set of scalable vector icons.
-   **Auth (Better Auth with JWT):** Custom integration with Better Auth for JWT issuance, handling token storage, and attaching JWTs to API requests.
-   **Other libs:** `react-query` (or `SWR`) for efficient client-side data fetching, caching, and mutation management.

## 3. Core Components & Responsibilities
-   **Layout & Root Structure (`app/layout.tsx`):** Defines the global layout, including HTML structure, dark mode provider, global CSS imports (Tailwind), and context providers.
-   **Auth Pages (`app/auth/login/page.tsx`, `app/auth/signup/page.tsx`):** Client Components responsible for user authentication forms, validation, and interaction with the authentication API.
-   **Dashboard & Tasks Page (`app/dashboard/page.tsx`):** A Server Component for initial task data fetching, rendering the main dashboard layout, sidebar/bottom nav, and integrating Task Cards.
-   **Task Card Component (`components/TaskCard.tsx`):** A Client Component responsible for displaying individual task details, handling completion toggle, edit/delete actions, animations on hover, and rendering status/priority badges.
-   **Add/Edit Task Modal (`components/TaskFormModal.tsx`):** A Client Component implementing the glassmorphism modal, containing forms for creating or updating tasks, including input fields, date pickers, and submission logic.
-   **Floating Action Button (`components/FAB.tsx`):** A Client Component for triggering the Add/Edit Task Modal, incorporating micro-animations.
-   **Sidebar Navigation + Mobile Bottom Nav (`components/Sidebar.tsx`, `components/MobileNav.tsx`):** Client Components managing navigation links and responsiveness, dynamically switching layout based on screen size.
-   **API Client (`lib/api.ts` with JWT):** A utility module for centralizing API calls, handling JWT attachment to outgoing requests, and error handling.

## 4. Key Design & Implementation Decisions
-   **Server vs Client Components strategy:** Initial data fetching for task lists and user specific data will be done on the server using Server Components (`app/dashboard/page.tsx`) to improve perceived performance and SEO. Interactive elements (forms, toggles, modals, animations) will be implemented as Client Components.
-   **Data fetching (server components vs SWR/react-query):** Server Components will handle the initial fetch of task data. Client-side mutations (add, update, delete, complete) and subsequent data revalidation will be managed using React Query for efficient caching and state synchronization.
-   **JWT storage & attachment (httpOnly cookie vs localStorage vs headers):** JWTs will be stored in `httpOnly` cookies to enhance security against XSS attacks. The API client (`lib/api.ts`) will automatically attach the JWT from these cookies to all authenticated requests.
-   **Dark mode implementation (next-themes or custom):** `next-themes` will be used for robust dark mode management, providing seamless theme switching and system preference detection. Custom CSS variables will define the color palette for both modes.
-   **Route protection (middleware or layout wrapper):** Authentication will be enforced via Next.js middleware, protecting routes based on JWT validity. Unauthenticated users attempting to access protected routes will be redirected to the login page.
-   **Optimistic updates for toggle complete:** When a user toggles task completion, the UI will update instantly (optimistic update) while the API call is in progress. Rollbacks will occur if the API call fails.
-   **Error handling & toasts flow:** Global error boundaries will catch unexpected UI errors. API errors will trigger specific toast notifications via Sonner, providing user-friendly feedback without interrupting the flow.
-   **Accessibility & ARIA:** All interactive UI elements will incorporate ARIA attributes, focus management, and keyboard navigation support to ensure accessibility for all users. High contrast settings will be tested and ensured.

## 5. Implementation Roadmap / High-Level Phases
1.  **Project Setup & Tailwind + Fonts Config:** Initialize Next.js project, configure Tailwind CSS with custom themes (glassmorphism, gradients, shadows), integrate `next/font` for Inter/Manrope.
2.  **Better Auth Integration + Auth Pages:** Implement `httpOnly` cookie-based JWT authentication, develop Login and Signup pages (`app/auth/login/page.tsx`, `app/auth/signup/page.tsx`) with form validation and API integration.
3.  **Protected Dashboard Layout + Sidebar/Bottom Nav:** Create a protected layout (`app/dashboard/layout.tsx`) with Next.js middleware, implement responsive sidebar navigation (`components/Sidebar.tsx`) and mobile bottom navigation (`components/MobileNav.tsx`).
4.  **Task List Page with Skeleton Loading & Data Fetching:** Develop `app/dashboard/page.tsx` as a Server Component for initial task data fetching, integrate React Query for client-side updates, and implement elegant skeleton loading UI for empty/loading states.
5.  **Task Card Component with Animations & Status Badges:** Build `components/TaskCard.tsx` with all specified design elements, hover animations using Framer Motion, and dynamic status/priority badges.
6.  **Add/Edit Task Modal/Form:** Create `components/TaskFormModal.tsx` with glassmorphism styling, form fields, date pickers, validation, and API integration for task creation/updates.
7.  **Floating Action Button + Create Flow:** Implement `components/FAB.tsx` with its micro-animations to trigger the task creation modal.
8.  **Dark Mode Toggle & Global Styles:** Integrate `next-themes` for dark mode functionality and ensure global styles adhere to the premium aesthetic across both themes.
9.  **Final Polish: Toasts, Error States, Responsiveness:** Implement Sonner for all user feedback (success/error toasts), refine error handling across the app, and ensure pixel-perfect responsiveness across all devices.

## 6. Alignment & Constraints Check
-   The plan strictly aligns with the "Frontend UI Specification & High-Level Design Plan" (001-premium-ui-spec) and the project's overall `constitution.md`.
-   All guiding principles from the constitution, such as Clean Code, Modular Design, Secure User Data Isolation, Minimal Dependencies, Python 3.13+, and TypeScript, are respected within the frontend context.
-   The chosen technology stack and implementation decisions are consistent with the Core Constraints & Technology Stack defined in the constitution.
-   **Trade-off:** For the MVP, a separate, complex global state management library (e.g., Redux, Zustand) will not be introduced. `react-query` will primarily handle server state, and React's `useState` and `useContext` will suffice for local and shared client state respectively, to maintain minimal dependencies and complexity.

## 7. Validation Checklist
-   [ ] Matches premium UI vision (glassmorphism, gradients, animations)
-   [ ] Responsive & accessible
-   [ ] Secure JWT handling
-   [ ] Prepares for backend integration (/lib/api.ts)
