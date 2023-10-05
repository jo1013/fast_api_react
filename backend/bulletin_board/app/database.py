from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os  # <- 추가된 코드

# 환경변수에서 DB 정보 가져오기
DB_USER = os.getenv("DB_USER")  
DB_PASSWORD = os.getenv("DB_PASSWORD")  
DB_HOST = os.getenv("DB_HOST")  
DB_PORT = os.getenv("DB_PORT") 
DB_NAME = os.getenv("DB_NAME") 

DATABASE_URL = f"postgresql://{str(DB_USER)}:{str(DB_PASSWORD)}@{str(DB_HOST)}:{str(DB_PORT)}/{str(DB_NAME)}"
print(DATABASE_URL)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

