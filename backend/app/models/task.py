# backend/app/models/task.py
from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import datetime, timezone

def utc_now():
    return datetime.now(timezone.utc)

class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)          # FIXED: type annotation added
    user_id: str = Field(foreign_key="user.id", index=True)            # Foreign key to Better Auth users
    title: str = Field(max_length=200, index=True)                     # Required, indexed
    description: Optional[str] = Field(default=None, max_length=1000) # Optional
    completed: bool = Field(default=False, index=True)                 # Completion status
    created_at: datetime = Field(default_factory=utc_now, nullable=False)  # Auto on create
    updated_at: datetime = Field(
        default_factory=utc_now,
        nullable=False
    )

    class Config:
        arbitrary_types_allowed = True