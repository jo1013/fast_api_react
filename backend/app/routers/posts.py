from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ..models import DBPost
from ..database import get_db

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



@router.get("/{post_id}")
def read_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(DBPost).filter(DBPost.no == post_id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return post
