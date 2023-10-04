from fastapi import FastAPI
from app.routers import authentication, user

app = FastAPI()

app.include_router(authentication.router, prefix="/auth", tags=["authentication"])
app.include_router(user.router, prefix="/users", tags=["users"])
