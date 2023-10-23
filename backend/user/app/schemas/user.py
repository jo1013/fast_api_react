from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserFind(BaseModel):
    email: str


class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    display_name: Optional[str] = None
    profile_image_url: Optional[str] = None
    bio: Optional[str] = None


class UserLogin(BaseModel):
    username: str
    password: str


class User(BaseModel):
    id: int
    username: str
    email: str
    password_hash: str
    display_name: Optional[str]
    profile_image_url: Optional[str]
    bio: Optional[str]
    created_at: datetime
    last_login: Optional[datetime]
    status: str
    role: str

    class Config:
        orm_mode = True
