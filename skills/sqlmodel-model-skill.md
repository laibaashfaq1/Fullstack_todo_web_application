# SQLModel Model Skill

## Description
This skill provides a template for defining SQLModel database models. It includes the necessary imports and structure for a `Table` class, common fields like `id`, `created_at`, `updated_at`, and demonstrates how to define relationships (e.g., foreign keys to a `User` model). Additionally, it includes sub-schemas (`Create`, `Read`, `Update`) derived from the base model for easy data validation and serialization, adhering to best practices for API interactions.

## Example Prompt
"DB Agent, define a SQLModel for `Todo` items. It should have fields for `id` (primary key), `title` (indexed, string), `description` (optional string), `completed` (boolean, default false), `owner_id` (foreign key to `User.id`), and `created_at`/`updated_at` (timestamps). Include `TodoCreate`, `TodoRead`, and `TodoUpdate` schemas for FastAPI integration."

## Template/Structure

```python
from typing import List, Optional
from datetime import datetime

from sqlmodel import Field, Relationship, SQLModel, create_engine # create_engine not directly used in model, but for context

# Assuming a User model exists or will be created
# from .user import User, UserRead # Adjust import path as needed

class {ModelName}Base(SQLModel):
    # Common attributes for creation and reading
    title: str = Field(index=True, max_length=255)
    description: Optional[str] = Field(default=None, max_length=1024)
    completed: bool = Field(default=False)

class {ModelName}({ModelName}Base, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

    # Foreign key for user isolation
    owner_id: Optional[int] = Field(default=None, foreign_key="user.id", index=True)
    # Relationship to the User model
    # owner: Optional[User] = Relationship(back_populates="{model_name_lower_plural}")

    # Example relationship for a one-to-many from User to Todo
    # If this model has a relationship to other models, define it here:
    # children: List["ChildModel"] = Relationship(back_populates="{model_name_lower}")

class {ModelName}Create({ModelName}Base):
    # Attributes required for creating a new instance
    # owner_id will be set by the API based on the authenticated user
    pass

class {ModelName}Read({ModelName}Base):
    # Attributes to expose when reading an instance
    id: int
    created_at: datetime
    updated_at: datetime
    # owner: UserRead # To include owner details when reading (nested Pydantic model)

class {ModelName}Update(SQLModel):
    # Attributes that can be updated
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    # owner_id should generally not be updated directly via API for security/integrity
```