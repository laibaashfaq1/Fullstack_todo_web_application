# Quickstart

This guide provides instructions to set up and run the backend server locally for development.

## Prerequisites

-   Python 3.9+
-   `uv` (or `pip`) installed
-   A Neon account and a connection string for your PostgreSQL database.

## 1. Setup Environment

1.  **Clone the repository** (if you haven't already).
2.  **Create a virtual environment**:
    ```bash
    python -m venv .venv
    source .venv/bin/activate
    # On Windows, use: .venv\Scripts\activate
    ```
3.  **Install dependencies**:
    ```bash
    uv pip install -r requirements.txt
    ```
4.  **Create a `.env` file** in the root of the backend project directory and add the following environment variables:
    ```env
    DATABASE_URL="your_neon_database_connection_string"
    BETTER_AUTH_SECRET="your_shared_secret_for_jwt_validation"
    ```
    Replace the placeholder values with your actual Neon connection string and the shared secret for Better Auth.

## 2. Running the Application

1.  **Start the server**:
    ```bash
    uvicorn main:app --reload
    ```
    The `--reload` flag enables auto-reloading, so the server will restart automatically when you make code changes.

2.  **Access the API**:
    -   The API will be running at `http://127.0.0.1:8000`.
    -   Interactive API documentation (Swagger UI) will be available at `http://127.0.0.1:8000/docs`.
    -   Alternative API documentation (ReDoc) will be available at `http://127.0.0.1:8000/redoc`.

## 3. Running Tests

To run the test suite:
```bash
pytest
```
This command will discover and run all tests in the `tests/` directory.
