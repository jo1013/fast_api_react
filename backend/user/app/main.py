from fastapi import FastAPI
from app.routers import authentication, users
from fastapi.middleware.cors import CORSMiddleware
from app.models.user_model import User

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8081",  # React 앱의 URL을 여기에 추가
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(authentication.router, prefix="/auth", tags=["authentication"])
app.include_router(user.router, prefix="/users", tags=["users"])


