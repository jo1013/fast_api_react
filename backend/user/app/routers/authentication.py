from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.schemas import UserCreate
from app.utils import get_password_hash, verify_password
from app.utils.email_utils import send_email
from app.models import User
from app.schemas import UserFind
from app.dependencies import get_db
from app.utils import create_access_token

router = APIRouter()


@router.post("/login")
def login(username: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    if not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    hashed_password = get_password_hash(user.password)
    new_user = User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    return {"message": "User created successfully"}

@router.post("/login")
def login(username: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    if not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    return {"message": "Logged in successfully"}

@router.post("/find-username/")
def find_username(request: UserFind, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Email not found")
    return {"username": user.username}


@router.post("/forgot-password/")
async def forgot_password(email: str, background_tasks: BackgroundTasks):
    user = await User.get(email=email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 실제 서비스에서는 랜덤 토큰 생성 및 저장 로직 필요
    token = "sample_token"

    # 이메일로 토큰 전송
    subject = "Your password reset link"
    content = f"Click the link below to reset your password: \n http://example.com/reset-password/{token}"
    background_tasks.add_task(send_email, subject, email, content)

    return {"detail": "Password reset email sent"}
