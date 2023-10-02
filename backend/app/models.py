# models.py

from pydantic import BaseModel
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class DBPost(Base):
    __tablename__ = "posts"

    no = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(String)
    created_date = Column(DateTime)
    read_count = Column(Integer)
    likes = Column(Integer, default=0)  # likes column added


class PostCreate(BaseModel):  # Used for creating a new post
    title: str
    content: str

class Post(BaseModel):  # Represents full post details
    no : int 
    title: str
    content: str
    created_date: datetime
    read_count: int
    likes: int  # likes added here as well

class PostOut(BaseModel):  # This seems redundant as 'Post' model above has the same fields
    no : int 
    title: str
    content: str
    created_date: datetime
    read_count: int
    likes: int  # likes added here as well
