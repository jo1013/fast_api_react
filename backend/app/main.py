from fastapi import FastAPI

app = FastAPI()

# CORS 설정 추가
app.add_middleware(
    allow_origins=["*"],  # 실제 배포 환경에서는 정확한 프런트엔드 주소를 지정해주세요.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)