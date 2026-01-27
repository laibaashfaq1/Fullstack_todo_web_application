from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.database import get_db
from app.models.task import Task
from app.security import get_current_user
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime, timezone

router = APIRouter()

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

@router.get("/tasks", response_model=List[Task])
def get_tasks(status: str = "all", sort: str = "created", db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    statement = select(Task).where(Task.user_id == str(current_user["user_id"]))
    if status == "pending":
        statement = statement.where(Task.completed == False)
    elif status == "completed":
        statement = statement.where(Task.completed == True)

    if sort == "title":
        statement = statement.order_by(Task.title)
    else:
        statement = statement.order_by(Task.created_at.desc())
    
    tasks = db.exec(statement).all()
    return tasks

@router.post("/tasks", response_model=Task)
def create_task(task_data: TaskCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    # Create new task with user_id from current_user
    new_task = Task(
        title=task_data.title,
        description=task_data.description,
        user_id=str(current_user["user_id"]),
        completed=False,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@router.delete("/tasks/{id}", response_model=dict)
def delete_task(id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    task = db.get(Task, id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    # Compare user_id as strings to handle type mismatch
    current_user_id = str(current_user["user_id"])
    task_user_id = str(task.user_id)
    if task_user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this task")
    
    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}

@router.get("/tasks/{id}", response_model=Task)
def get_task(id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    task = db.get(Task, id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    # Compare user_id as strings to handle type mismatch
    current_user_id = str(current_user["user_id"])
    task_user_id = str(task.user_id)
    if task_user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this task")
    return task

@router.put("/tasks/{id}", response_model=Task)
def update_task(id: int, task_update: TaskUpdate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    task = db.get(Task, id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    # Compare user_id as strings to handle type mismatch
    current_user_id = str(current_user["user_id"])
    task_user_id = str(task.user_id)
    if task_user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this task")
    
    # Update only provided fields
    if task_update.title is not None:
        task.title = task_update.title
    if task_update.description is not None:
        task.description = task_update.description
    if task_update.completed is not None:
        task.completed = task_update.completed
    
    task.updated_at = datetime.now(timezone.utc)
    
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@router.patch("/tasks/{id}/complete", response_model=Task)
def toggle_complete(id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    task = db.get(Task, id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    # Compare user_id as strings to handle type mismatch
    current_user_id = str(current_user["user_id"])
    task_user_id = str(task.user_id)
    if task_user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this task")
    
    task.completed = not task.completed
    task.updated_at = datetime.now(timezone.utc)
    
    db.add(task)
    db.commit()
    db.refresh(task)
    return task
