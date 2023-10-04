from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from ..models import DBPost
from ..dependencies.dependencies import get_db
from pydantic import BaseModel

class CreatePost(BaseModel):
    title: str
    content: str

router = APIRouter()

@router.post("/{post_no}/like")
def like_post(post_no: int, db: Session = Depends(get_db)):
    post = db.query(DBPost).filter(DBPost.no == post_no).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if post.likes is None:
        post.likes = 0
    post.likes += 1
    db.commit()
    return {"message": "Post liked", "likes": post.likes}

@router.get("/")
async def get_posts(db: Session = Depends(get_db)):
    posts = db.query(DBPost).all()
    return posts

@router.get("/{post_id}")
def read_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(DBPost).filter(DBPost.no == post_id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.post("/")
def create_post(post: CreatePost, db: Session = Depends(get_db)):
    db_post = DBPost(title=post.title, content=post.content)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return {"post_id": db_post.no, "title": db_post.title, "content": db_post.content}
