from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os  # <- 추가된 코드

# 환경변수에서 DB 정보 가져오기
DB_USER = os.getenv("DB_USER")  # 기본값으로 "postgres" 설정
DB_PASSWORD = os.getenv("DB_PASSWORD")  # 기본값으로 "password" 설정
DB_HOST = os.getenv("DB_HOST")  # 기본값으로 "db" 설정
DB_PORT = os.getenv("DB_PORT") # 기본값으로 "5432" 설정
DB_NAME = os.getenv("DB_NAME")  # 기본값으로 "postgres" 설정

DATABASE_URL = f"postgresql://{str(DB_USER)}:{str(DB_PASSWORD)}@{str(DB_HOST)}:{str(DB_PORT)}/{str(DB_NAME)}"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

