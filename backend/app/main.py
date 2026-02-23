# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # ← Yeh import add karo
from app.routes import tasks, auth
from app.database import create_db_and_tables
from app.utils.error_handlers import setup_error_handlers

app = FastAPI()

# CORS Middleware – Yeh code yahan add kar do (frontend se connect hone ke liye)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://fullstack-todo-web-application.vercel.app"],  # Tumhara frontend (Next.js) URL
    allow_credentials=True,
    allow_methods=["*"],   # Sab HTTP methods allow (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],   # Sab headers allow (Authorization, Content-Type, etc.)
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

setup_error_handlers(app)  # Error handlers

app.include_router(tasks.router, prefix="/api")
app.include_router(auth.router, prefix="/api")

@app.get("/")
def read_root():
    return {"Hello": "World"}
