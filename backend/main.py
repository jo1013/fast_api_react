from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.models import Post
from app.routers import posts
from app.dependencies.dependencies import get_db, SessionLocal
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.include_router(posts.router, prefix="/post", tags=["posts"])

# CORS 설정 (운영 환경에서는 보안을 위해 수정 필요)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

