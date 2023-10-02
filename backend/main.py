from fastapi import APIRouter, HTTPException, Depends
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import sessionmaker, Session,declarative_base
from app.models import *
from app.routers import posts
from datetime import datetime

Base = declarative_base()
router = APIRouter()
DATABASE_URL = "postgresql://postgres:password@db:5432/postgres"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

app = FastAPI()

app.include_router(posts.router, prefix="/posts", tags=["posts"])

class Post(Base):
    __tablename__ = "posts"

    no = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(String)
    created_date = Column(DateTime)
    read_count = Column(Integer)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CORS 설정 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@router.post("/{post_no}/like")
async def like_post(post_no: int, db: Session = Depends(get_db)):
    # 데이터베이스에서 post_no로 게시글을 찾습니다.
    post = db.query(PostDB).filter(PostDB.no == post_no).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    # 게시글의 좋아요 수를 증가시키기
    post.likes += 1

    # 데이터베이스에 변경 사항 저장
    db.commit()

    return {"message": "Liked successfully", "likes": post.likes}

@app.get("/posts/")
def read_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    posts = db.query(DBPost).offset(skip).limit(limit).all()
    return posts

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
