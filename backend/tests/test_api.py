from fastapi.testclient import TestClient
from sqlmodel import Session, create_engine, SQLModel
from app.main import app
from app.database import get_db, create_db_and_tables
import pytest
import os
from dotenv import load_dotenv

load_dotenv()

# Use a test database
DATABASE_URL_TEST = os.getenv("DATABASE_URL_TEST", "sqlite:///./test.db")
engine_test = create_engine(DATABASE_URL_TEST)

# Override get_db for testing
@pytest.fixture(name="session")
def session_fixture():
    SQLModel.metadata.create_all(engine_test)
    with Session(engine_test) as session:
        yield session
    SQLModel.metadata.drop_all(engine_test)

@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_session_override():
        return session
    app.dependency_overrides[get_db] = get_session_override
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()

@pytest.fixture(name="authenticated_client")
def authenticated_client_fixture(client: TestClient):
    # Register a user
    client.post("/api/signup", json={
        "email": "test@example.com",
        "hashed_password": "testpassword",
        "first_name": "Test",
        "last_name": "User"
    })
    # Login and get token
    response = client.post(
        "/api/token",
        data={"username": "test@example.com", "password": "testpassword"},
    )
    assert response.status_code == 200
    
    # Extract access_token from response cookies
    access_token = response.cookies.get("access_token")
    assert access_token is not None

    # Update client to include the token for subsequent requests
    # TestClient manages cookies automatically, so no need to manually add headers
    return client


def test_create_user_signup(client: TestClient):
    response = client.post(
        "/api/signup",
        json={"email": "new@example.com", "hashed_password": "newpassword", "first_name": "New", "last_name": "User"},
    )
    assert response.status_code == 200
    assert response.json()["message"] == "User created successfully"

    response = client.post(
        "/api/signup",
        json={"email": "new@example.com", "hashed_password": "newpassword", "first_name": "New", "last_name": "User"},
    )
    assert response.status_code == 400
    assert response.json()["message"] == "Email already registered"

def test_login_for_access_token(client: TestClient):
    client.post(
        "/api/signup",
        json={"email": "login@example.com", "hashed_password": "loginpassword", "first_name": "Login", "last_name": "User"},
    )
    response = client.post(
        "/api/token",
        data={"username": "login@example.com", "password": "loginpassword"},
    )
    assert response.status_code == 200
    assert response.json()["message"] == "Login successful"
    assert "access_token" in response.cookies

def test_login_incorrect_password(client: TestClient):
    client.post(
        "/api/signup",
        json={"email": "wrongpass@example.com", "hashed_password": "correctpassword", "first_name": "Wrong", "last_name": "Pass"},
    )
    response = client.post(
        "/api/token",
        data={"username": "wrongpass@example.com", "password": "wrongpassword"},
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "Incorrect username or password"

def test_create_task(authenticated_client: TestClient):
    response = authenticated_client.post(
        "/api/tasks",
        json={"title": "Test Task", "description": "This is a test task", "completed": False},
    )
    assert response.status_code == 200
    assert response.json()["title"] == "Test Task"
    assert response.json()["completed"] is False

def test_read_tasks(authenticated_client: TestClient):
    # Create a task first
    authenticated_client.post(
        "/api/tasks",
        json={"title": "Task 1", "description": "Description 1", "completed": False},
    )
    authenticated_client.post(
        "/api/tasks",
        json={"title": "Task 2", "description": "Description 2", "completed": True},
    )

    response = authenticated_client.get("/api/tasks")
    assert response.status_code == 200
    assert len(response.json()) == 2
    assert response.json()[0]["title"] == "Task 2" # Sorted by creation date desc

    response = authenticated_client.get("/api/tasks?status=pending")
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["title"] == "Task 1"

    response = authenticated_client.get("/api/tasks?status=completed")
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["title"] == "Task 2"

    response = authenticated_client.get("/api/tasks?sort=title")
    assert response.status_code == 200
    assert len(response.json()) == 2
    assert response.json()[0]["title"] == "Task 1" # Sorted by title asc

def test_read_single_task(authenticated_client: TestClient):
    task_response = authenticated_client.post(
        "/api/tasks",
        json={"title": "Single Task", "description": "Details", "completed": False},
    )
    task_id = task_response.json()["id"]

    response = authenticated_client.get(f"/api/tasks/{task_id}")
    assert response.status_code == 200
    assert response.json()["title"] == "Single Task"

def test_update_task(authenticated_client: TestClient):
    task_response = authenticated_client.post(
        "/api/tasks",
        json={"title": "Old Title", "description": "Old Description", "completed": False},
    )
    task_id = task_response.json()["id"]

    response = authenticated_client.put(
        f"/api/tasks/{task_id}",
        json={"title": "New Title", "description": "New Description", "completed": True},
    )
    assert response.status_code == 200
    assert response.json()["title"] == "New Title"
    assert response.json()["description"] == "New Description"
    assert response.json()["completed"] is True

def test_toggle_complete_task(authenticated_client: TestClient):
    task_response = authenticated_client.post(
        "/api/tasks",
        json={"title": "Toggle Task", "completed": False},
    )
    task_id = task_response.json()["id"]

    response = authenticated_client.patch(f"/api/tasks/{task_id}/complete")
    assert response.status_code == 200
    assert response.json()["completed"] is True

    response = authenticated_client.patch(f"/api/tasks/{task_id}/complete")
    assert response.status_code == 200
    assert response.json()["completed"] is False

def test_delete_task(authenticated_client: TestClient):
    task_response = authenticated_client.post(
        "/api/tasks",
        json={"title": "Task to Delete", "completed": False},
    )
    task_id = task_response.json()["id"]

    response = authenticated_client.delete(f"/api/tasks/{task_id}")
    assert response.status_code == 200
    assert response.json()["message"] == "Task deleted successfully"

    response = authenticated_client.get(f"/api/tasks/{task_id}")
    assert response.status_code == 404