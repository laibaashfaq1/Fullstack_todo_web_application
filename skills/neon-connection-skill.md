# Neon DB Connection & Environment Setup Skill

## Description
This skill provides the necessary code and guidance for establishing a secure and robust connection to a Neon PostgreSQL database using SQLModel in a FastAPI application. It focuses on best practices for managing database credentials through environment variables (specifically `DATABASE_URL`), creating the SQLModel engine, and providing a dependency for managing database sessions.

## Example Prompt
"DB Agent, set up the Neon DB connection within the FastAPI application. Use `DATABASE_URL` from environment variables for the connection string. Create the `engine` and a `get_db` dependency function that yields a `Session`. Ensure `SQLModel.metadata.create_all(engine)` is called on application startup to create tables."

## Template/Structure

```python
import os
from typing import Generator

from sqlmodel import create_engine, Session, SQLModel

# Recommended: Use python-dotenv to load environment variables from a .env file during development.
# from dotenv import load_dotenv
# load_dotenv() # Call this at the application's entry point if not handled elsewhere

# Retrieve the database URL from environment variables
# In production, this should be set directly in the environment (e.g., by your hosting provider)
DATABASE_URL = os.getenv("DATABASE_URL")

# Raise an error if the database URL is not configured
if not DATABASE_URL:
    raise ValueError(
        "DATABASE_URL environment variable is not set. "
        "Please configure it with your Neon PostgreSQL connection string."
    )

# Create the SQLModel engine
# echo=True will log all SQL statements, useful for debugging
engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    """
    Creates all database tables defined by SQLModel metadata.
    This should typically be called once on application startup.
    """
    print("Creating database tables if they don't exist...")
    SQLModel.metadata.create_all(engine)
    print("Database tables created.")

def get_db() -> Generator[Session, None, None]:
    """
    Dependency function to provide a database session.
    It ensures the session is closed after the request is finished.
    """
    with Session(engine) as session:
        yield session

# Example of how to integrate into a FastAPI app:
# from fastapi import Depends, FastAPI
#
# app = FastAPI()
#
# @app.on_event("startup")
# def on_startup():
#     create_db_and_tables()
#
# @app.get("/health")
# def health_check(session: Session = Depends(get_db)):
#     # An example endpoint that uses the database session
#     try:
#         session.execute(text("SELECT 1"))
#         return {"status": "ok", "database": "connected"}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Database connection failed: {e}")

```