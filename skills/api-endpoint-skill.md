# API Endpoint Skill (FastAPI)

## Description
This skill provides a reusable template for generating FastAPI REST API endpoints. It covers common patterns such as defining path operations (GET, POST, PUT, DELETE), implementing dependency injection for database sessions and user authentication, and handling HTTP exceptions. The template ensures adherence to the project's requirements for user isolation by always including mechanisms to filter data based on the authenticated user.

## Example Prompt
"Backend Agent, implement a FastAPI endpoint at `/api/tasks/{task_id}` for GET, PUT, and DELETE operations. Ensure it uses `Depends(get_current_active_user)` to authenticate and authorize the request, and retrieves or modifies tasks belonging only to the authenticated user. For GET, return a `TodoRead` model; for PUT, accept a `TodoUpdate` model; for DELETE, return a confirmation message."

## Template/Structure

```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List, Optional

from ..dependencies import get_db, get_current_active_user # Adjust import paths as needed
from ..models.user import User # Assuming User model for authentication
from ..models.todo import Todo, TodoCreate, TodoRead, TodoUpdate # Assuming Todo models

router = APIRouter()

# Example: Get a single resource
@router.{http_method}("/api/{resource_name}s/{resource_id_param}", response_model={ResourceReadModel})
async def read_{resource_name}(
    {resource_id_param}: int, # Example: task_id: int
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    # Logic to fetch the resource, ensuring ownership by current_user
    statement = select({ResourceModel}).where(
        {ResourceModel}.id == {resource_id_param},
        {ResourceModel}.owner_id == current_user.id # Enforce user isolation
    )
    resource = db.exec(statement).first()
    if not resource:
        raise HTTPException(status_code=404, detail="{ResourceName} not found or not owned by user")
    return resource

# Example: Create a resource
@router.{http_method}("/api/{resource_name}s/", response_model={ResourceReadModel}, status_code=status.HTTP_201_CREATED)
async def create_{resource_name}(
    {resource_create_model_instance}: {ResourceCreateModel}, # Example: task: TodoCreate
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    db_{resource_name} = {ResourceModel}.model_validate({resource_create_model_instance}, update={{"owner_id": current_user.id}})
    db.add(db_{resource_name})
    db.commit()
    db.refresh(db_{resource_name})
    return db_{resource_name}

# Example: Update a resource
@router.{http_method}("/api/{resource_name}s/{resource_id_param}", response_model={ResourceReadModel})
async def update_{resource_name}(
    {resource_id_param}: int, # Example: task_id: int
    {resource_update_model_instance}: {ResourceUpdateModel}, # Example: task_update: TodoUpdate
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    statement = select({ResourceModel}).where(
        {ResourceModel}.id == {resource_id_param},
        {ResourceModel}.owner_id == current_user.id
    )
    resource = db.exec(statement).first()
    if not resource:
        raise HTTPException(status_code=404, detail="{ResourceName} not found or not owned by user")

    hero.sqlmodel_update(resource_update)
    db.add(resource)
    db.commit()
    db.refresh(resource)
    return resource

# Example: Delete a resource
@router.{http_method}("/api/{resource_name}s/{resource_id_param}")
async def delete_{resource_name}(
    {resource_id_param}: int, # Example: task_id: int
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    statement = select({ResourceModel}).where(
        {ResourceModel}.id == {resource_id_param},
        {ResourceModel}.owner_id == current_user.id
    )
    resource = db.exec(statement).first()
    if not resource:
        raise HTTPException(status_code=404, detail="{ResourceName} not found or not owned by user")

    db.delete(resource)
    db.commit()
    return {{"message": "{ResourceName} deleted successfully"}}

```