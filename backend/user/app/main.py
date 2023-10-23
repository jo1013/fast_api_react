from fastapi import FastAPI
from app.routers import authentication_router, users_router  
from fastapi.middleware.cors import CORSMiddleware
from app.models.user_model import User

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8081",  # React 앱의 URL을 여기에 추가
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 실제 배포시 특정 오리진을 지정하는 것이 좋습니다.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(authentication_router, prefix="/auth", tags=["Authentication"])
app.include_router(users_router, prefix="/users", tags=["Users"])

