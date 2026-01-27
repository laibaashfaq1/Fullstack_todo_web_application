# JWT Verification Middleware Skill (FastAPI)

## Description
This skill provides a robust template for implementing JSON Web Token (JWT) verification as a FastAPI dependency. It handles extracting the JWT from the `Authorization` header, decoding and validating the token's signature, and extracting the user's identifier (e.g., `user_id`). This mechanism ensures that only authenticated and authorized users can access protected API routes, enforcing user isolation by associating requests with a specific user.

## Example Prompt
"Auth Agent, create a FastAPI dependency `get_current_active_user` that integrates with `OAuth2PasswordBearer`. It should parse the JWT from the 'Authorization' header, decode it using the `SECRET_KEY` from environment variables, and validate it. If valid, return a `User` object (or a Pydantic model representing the user payload) containing the `user_id` and any `scopes`. Raise `HTTPException` for invalid or missing tokens."

## Template/Structure

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel
import os
from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta

# Recommended: Use python-dotenv to load environment variables from a .env file during development.
# from dotenv import load_dotenv
# load_dotenv() # Call this at the application's entry point if not handled elsewhere

# --- Configuration ---
# The secret key for signing and verifying JWT tokens.
# IMPORTANT: This must be a strong, randomly generated key and kept secure.
# Load from environment variable in production!
SECRET_KEY = os.getenv("SECRET_KEY", "SUPER_SECRET_KEY_REPLACE_ME") # !!! REPLACE WITH A SECURE KEY !!!
ALGORITHM = "HS256" # Or other appropriate algorithm like RS256

# OAuth2PasswordBearer is used to extract the token from the request header.
# tokenUrl should point to your login endpoint where a token can be obtained.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token") # Adjust tokenUrl to your actual login endpoint

# --- Models (assuming a User model or Pydantic representation) ---
class TokenData(BaseModel):
    user_id: Optional[int] = None
    # Add other fields you expect in your JWT payload, e.g., roles, scopes
    scopes: List[str] = []

class User(BaseModel):
    id: int
    username: str
    email: str
    is_active: bool = True
    # Add other relevant user fields

class UserInDB(User):
    hashed_password: str

# --- JWT Utility Functions ---
def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15) # Default expiration
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# --- Dependency to get the current authenticated user ---
async def get_current_user(token: str = Depends(oauth2_scheme)) -> Dict[str, Any]:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={{"WWW-Authenticate": "Bearer"}},
    )
    try:
        # Decode the JWT token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        # Extract user_id and optionally scopes from the payload
        user_id: int = payload.get("sub") # 'sub' (subject) is commonly used for user ID
        if user_id is None:
            raise credentials_exception
        
        # In a real application, you would typically fetch the user from the database
        # based on the user_id to ensure they are active and retrieve full user data.
        # For simplicity, returning a dictionary representation here.
        
        # You might also want to check for token expiration here if 'exp' claim is not enough.
        
        return {"id": user_id, "scopes": payload.get("scopes", [])} # Return basic user info or a User object
    except JWTError:
        raise credentials_exception

# Example for an "active" user (e.g., checking is_active status from DB)
# For the hackathon, returning just the ID might be sufficient.
async def get_current_active_user(current_user: Dict[str, Any] = Depends(get_current_user)):
    # Here you would typically fetch the user from the database using current_user["id"]
    # and check if user.is_active.
    # For this hackathon, we'll assume any user with a valid token is active.
    # If the user object included 'is_active', you'd check it here:
    # if not current_user.is_active:
    #    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")
    return current_user # Or a full User object if fetched from DB

# --- Usage Example in a FastAPI path operation ---
# from fastapi import FastAPI
# app = FastAPI()
#
# @app.get("/users/me")
# async def read_users_me(current_user: Dict[str, Any] = Depends(get_current_active_user)):
#     return {{"message": f"Hello, user {current_user['id']} with scopes {current_user['scopes']}!"}}
#
# @app.get("/protected-resource", scopes=["admin"]) # Example of scope-based authorization
# async def read_protected_resource(current_user: Dict[str, Any] = Depends(get_current_active_user)):
#     if "admin" not in current_user["scopes"]:
#         raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
#     return {{"message": "This is a secret admin resource!"}}
```