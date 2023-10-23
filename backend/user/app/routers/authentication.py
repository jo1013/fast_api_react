from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, status
from sqlalchemy.orm import Session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from app.schemas import UserCreate, Token, UserFind, PasswordReset
from app.models import User
from app.dependencies import get_db
from app.utils import (
    get_password_hash, 
    verify_password, 
    create_access_token, 
    generate_password_reset_token,
    send_reset_password_email
)

router = APIRouter()


@router.post("/login", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if user is None or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/signup", response_model=UserCreate)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    user_in_db = db.query(User).filter(User.username == user.username).first()
    if user_in_db:
        raise HTTPException(status_code=400, detail="Username is already taken")
    
    hashed_password = get_password_hash(user.password)
    new_user = User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}


@router.post("/find-username", response_model=UserFind)
def find_username(request: UserFind, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Email not found")
    return user


@router.post("/forgot-password", response_model=PasswordReset)
async def forgot_password(request: PasswordReset, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 실제 서비스에서는 랜덤 토큰 생성 및 저장 로직 필요
    token = generate_password_reset_token(email=request.email)
    background_tasks.add_task(send_reset_password_email, email=request.email, email_subject="Password recovery", token=token)

    return {"message": "Password recovery email sent"}
