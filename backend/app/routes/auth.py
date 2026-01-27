from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from app.database import get_db
from app.models.user import User
from app.security import verify_password, get_password_hash, create_access_token, get_current_user
from datetime import datetime, timedelta

router = APIRouter()

ACCESS_TOKEN_EXPIRE_MINUTES = 30 # Define this here or import from config


from pydantic import BaseModel
class UserCreate(BaseModel):
    email: str
    password: str
    first_name: str | None = None
    last_name: str | None = None


@router.post("/signup", response_model=dict)
def signup_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.exec(select(User).where(User.email == user.email)).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        hashed_password=hashed_password,
        first_name=user.first_name,
        last_name=user.last_name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "User created successfully"}

@router.post("/token", response_model=dict)
async def login_for_access_token(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)): # Add response parameter
    user = db.exec(select(User).where(User.email == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"user_id": user.id}, expires_delta=access_token_expires
    )
    
    response.set_cookie(
        key="access_token", 
        value=access_token, 
        httponly=True, 
        samesite="Lax", 
        expires=(datetime.utcnow() + access_token_expires).timestamp()
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/logout", response_model=dict)
async def logout_user(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Logout successful"}

@router.get("/user/me", response_model=dict)
async def get_current_user_info(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    user = db.get(User, current_user["user_id"])
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return {
        "user_id": str(user.id),
        "email": user.email,
        "username": user.email.split("@")[0],  # Use email prefix as username
        "first_name": user.first_name,
        "last_name": user.last_name
    }