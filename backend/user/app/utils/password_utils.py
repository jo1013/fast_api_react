#get_password_hash, verify_password

# password_utils.py
import bcrypt
from typing import Optional

def get_password_hash(password: str) -> str:
    """
    주어진 패스워드에 대한 해시 값을 반환합니다.
    
    :param password: 해시하기 전의 패스워드
    :return: 해시된 패스워드
    """
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    평문 패스워드와 해시된 패스워드가 일치하는지 확인합니다.
    
    :param plain_password: 사용자로부터 입력받은 평문 패스워드
    :param hashed_password: 데이터베이스 등에서 저장된 해시된 패스워드
    :return: 패스워드가 일치하면 True, 그렇지 않으면 False
    """
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
