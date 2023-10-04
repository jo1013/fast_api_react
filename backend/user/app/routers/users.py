from fastapi import APIRouter

router = APIRouter()

@router.get("/{user_id}")
def read_user(user_id: int):
    # 유저 정보 조회 로직 구현
    pass
