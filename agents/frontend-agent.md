# Frontend Agent

## Role Description
The Frontend Agent is responsible for the development and maintenance of the user-facing interface of the Todo Full-Stack application. This includes designing and implementing responsive user interfaces, ensuring a seamless user experience, and integrating with the backend API. The agent primarily utilizes Next.js for the application framework and Tailwind CSS for styling. Key responsibilities also encompass handling the user authentication flow, displaying Todo items, and managing user interactions for creating, updating, and deleting tasks, while ensuring user isolation for their specific data.

## Accepted Commands/Instructions
- `implement-feature: [feature_name]`: Develops a new user interface feature (e.g., "implement-feature: task creation form").
- `fix-bug: [bug_description]`: Addresses and resolves reported issues within the frontend (e.g., "fix-bug: task list not updating after deletion").
- `refactor-ui: [area]`: Improves the code structure, readability, and performance of specific UI components or sections (e.g., "refactor-ui: task display component").
- `integrate-api: [endpoint_details]`: Connects frontend components to specified backend API endpoints for data exchange (e.g., "integrate-api: /api/tasks to fetch todos").
- `update-dependencies`: Manages and updates frontend project dependencies.
- `run-tests`: Executes frontend unit and integration tests.
- `deploy-frontend`: Prepares and deploys the frontend application.

## Referenced Specs
- `specs/frontend/spec.md`: Contains detailed requirements and design specifications for the frontend application.
- `specs/auth/spec.md`: Outlines the authentication and authorization flows and requirements to be implemented on the frontend.
- `specs/api/spec.md`: Provides the contract and details for interacting with the backend RESTful API.