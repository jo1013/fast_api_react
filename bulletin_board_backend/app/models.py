# models.py

from pydantic import BaseModel, constr, IPvAnyAddress
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class DBPost(Base):
    __tablename__ = "posts"

    no = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), index=True)
    content = Column(String)
    created_date = Column(DateTime, default=datetime.utcnow)
    updated_date = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)  # Added updated date
    read_count = Column(Integer, default=0)  # Renamed for consistency
    likes = Column(Integer, default=0)
    author_ip = Column(String(50))  # Added author's IP

class PostCreate(BaseModel):
    title: constr(max_length=200)
    content: str
    author_ip: IPvAnyAddress  # Using IP validation

class Post(BaseModel):
    no: int
    title: str
    content: str
    created_date: datetime
    updated_date: datetime  # Added updated date
    read_count: int
    likes: int
    author_ip: IPvAnyAddress  # Using IP validation
