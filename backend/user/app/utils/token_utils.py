import jwt
from typing import Optional, Union
from datetime import datetime, timedelta
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("USER_SECRET_KEY")
if SECRET_KEY is None:
    raise EnvironmentError("No 'USER_SECRET_KEY' provided in environment variables")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
PASSWORD_RESET_EXPIRE_MINUTES = 60


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
    exp: datetime


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    주어진 데이터를 사용하여 액세스 토큰을 생성합니다.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_access_token(token: str) -> Optional[TokenData]:
    """
    주어진 토큰을 검증합니다.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            return None
        token_data = TokenData(username=username, exp=payload.get("exp"))
        return token_data
    except jwt.JWTError:
        return None


def generate_password_reset_token(email: str) -> str:
    """
    주어진 사용자 이메일에 대한 비밀번호 재설정 토큰을 생성합니다.
    """
    expire = datetime.utcnow() + timedelta(minutes=PASSWORD_RESET_EXPIRE_MINUTES)
    to_encode = {"exp": expire, "sub": email}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
