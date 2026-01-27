# Data Models

This document outlines the data models for the backend service.

## 1. Task Entity

The `Task` entity represents a single to-do item in the system.

### Fields

| Field         | Type      | Constraints                               | Description                                      |
|---------------|-----------|-------------------------------------------|--------------------------------------------------|
| `id`          | `Integer` | **Primary Key**, Auto-incrementing        | Unique identifier for the task.                  |
| `user_id`     | `Integer` | **Foreign Key** to `users` table, Indexed | The ID of the user who owns the task.            |
| `title`       | `String`  | **Required**, Max length: 255             | The title of the task.                           |
| `description` | `String`  | Optional                                  | A detailed description of the task.              |
| `completed`   | `Boolean` | **Required**, Default: `false`, Indexed   | The completion status of the task.               |
| `created_at`  | `DateTime`| **Required**, Auto-generated on creation  | Timestamp when the task was created.             |
| `updated_at`  | `DateTime`| **Required**, Auto-generated on update    | Timestamp when the task was last updated.        |

### Relationships

-   **Belongs to `User`**: Each `Task` is owned by exactly one `User`. The `user_id` field establishes this relationship. The `users` table itself is considered external and managed by the "Better Auth" service.

### State Transitions

-   A `Task` is created with `completed` as `false`.
-   The `completed` status can be toggled between `true` and `false` via the `PATCH /api/tasks/{id}/complete` endpoint.

### Validation Rules

-   `title` is a mandatory field for creation.
-   `title` cannot be an empty string.
-   `user_id` must correspond to a valid user (though this is enforced by the JWT, not a database constraint managed by this service).
