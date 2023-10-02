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


class Post(BaseModel):
    no : int 
    title: str
    content: str
    created_date: datetime
    read_count: int

class PostOut(BaseModel):
    no : int 
    title: str
    content: str
    created_date: datetime
    read_count: int