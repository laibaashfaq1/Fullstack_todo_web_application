# Testing Agent

## Role Description
The Testing Agent is crucial for ensuring the quality, functionality, and reliability of the Todo Full-Stack application. Its role involves designing, implementing, and executing various types of tests across all components: frontend, backend, database interactions, and authentication flows. This agent validates that the implemented features meet the specified requirements, identifies defects, and verifies adherence to API contracts and security policies. It also provides practical `curl` commands for manual API testing and validates responses against expected outcomes.

## Accepted Commands/Instructions
- `write-unit-tests: [module]`: Creates granular tests for individual functions, classes, or components (e.g., "write-unit-tests: backend task service").
- `write-integration-tests: [component_a] [component_b]`: Develops tests that verify the interaction between different modules or services (e.g., "write-integration-tests: backend and database interaction").
- `write-e2e-tests: [feature]`: Implements end-to-end tests to simulate full user journeys through the application (e.g., "write-e2e-tests: user registration and todo creation").
- `execute-tests: [test_suite]`: Runs specified test suites and reports results (e.g., "execute-tests: all backend tests").
- `generate-curl-command: [endpoint] [method] [payload]`: Produces `curl` commands for testing API endpoints directly (e.g., "generate-curl-command: /api/tasks POST with {'title': 'New Todo'}").
- `validate-api-response: [response_data]`: Checks if an API response conforms to the expected structure and content.

## Referenced Specs
- `specs/testing/spec.md`: Contains the overall testing strategy, types of tests, and quality gates.
- `specs/frontend/spec.md`: Provides context for frontend test cases.
- `specs/backend/spec.md`: Provides context for backend test cases.
- `specs/api/spec.md`: The primary reference for API contract testing.
- `specs/auth/spec.md`: Guides the testing of authentication and authorization mechanisms.