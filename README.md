# React & FastAPI Blog Application

React, FastAPI, 그리고 PostgreSQL을 기반으로 한 다기능 블로그 애플리케이션입니다. 이 애플리케이션은 사용자 친화적인 프론트엔드와 효율적인 백엔드 API, 안정적인 데이터 저장을 위한 데이터베이스를 조합하여 만들어졌습니다.


## 주요 특징

- **게시글 목록**: `PostList` 컴포넌트를 활용해 게시글 목록을 표시합니다.
- **게시글 디자인**: 게시글의 제목은 Material-UI를 통해 스타일링 되었습니다.
- **메인 화면**: `PostMain` 컴포넌트로 게시판의 메인 화면을 구현하였습니다.
- **좋아요 기능**: 메인 화면에는 "좋아요" 기능이 포함되어 있습니다.

## 기술 스택

- **React**: 프론트엔드 구축에 사용된 주요 프레임워크입니다.
- **axios**: API 호출에 사용됩니다.
- **Material-UI**: 디자인 및 UI 구성에 활용되었습니다.
- **Docker**: 애플리케이션의 컨테이너화를 위해 사용되었습니다.
- **FastAPI**: 백엔드 개발에 사용된 프레임워크입니다. `main.py` 실행으로 데이터베이스 생성이 가능합니다.

## 발생한 이슈

- 게시글 빌드 중 `import`와 `export` 문법 오류 발생. 이후 문제 해결.

## Docker Compose 구성

- **react_app**: React 기반의 프론트엔드 애플리케이션입니다.
- **nginx**: 웹 서버로, React 앱과 FastAPI 백엔드 서버 간의 트래픽을 처리합니다.
- **fastapi_app**: FastAPI 기반의 백엔드 애플리케이션입니다.
- **redis**: 세션 관리나 캐시 처리를 위한 인메모리 데이터 저장소입니다.
- **postgres_db**: PostgreSQL 데이터베이스로, 블로그의 게시글, 사용자 정보 등을 저장합니다.

## 데이터베이스 스키마

### 1. users 테이블

사용자 정보 저장

```sql

CREATE TABLE users (
    id SERIAL PRIMARY KEY,                -- 고유한 사용자 ID
    username VARCHAR(255) NOT NULL UNIQUE,-- 사용자 이름 (고유해야 함)
    email VARCHAR(255) NOT NULL UNIQUE,   -- 사용자의 이메일 주소 (고유해야 함)
    password_hash VARCHAR(512) NOT NULL,  -- 비밀번호의 해쉬 값
    display_name VARCHAR(255),            -- 화면에 표시될 사용자 이름
    profile_image_url TEXT,               -- 프로필 이미지의 URL
    bio TEXT,                             -- 사용자의 간단한 소개
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 계정 생성 일시
    last_login TIMESTAMP,                 -- 마지막 로그인 일시
    status VARCHAR(50) DEFAULT 'active',  -- 계정 상태 (예: active, banned, deactivated)
    role VARCHAR(50) DEFAULT 'user'       -- 계정 권한 (예: user, admin, moderator)
);
CREATE INDEX idx_users_email ON users(email);

```

### 2. post_likes 테이블
게시글에 대한 좋아요 정보 저장

```
CREATE TABLE post_likes (
    id SERIAL PRIMARY KEY,                  -- 고유한 ID
    user_id INT NOT NULL,                  -- 사용자 ID
    posts_no INT NOT NULL,                 -- 게시글 번호
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 좋아요를 누른 시각
    FOREIGN KEY (user_id) REFERENCES users(id),  -- 'users' 테이블을 참조
    FOREIGN KEY (posts_no) REFERENCES posts(no),  -- 'posts' 테이블의 게시글 번호를 참조
    UNIQUE (user_id, posts_no)             -- 한 사용자가 한 게시물에 대해 좋아요를 중복으로 누르지 못하게 제한

);
```



## 프로젝트 구조 설명 

### Dockerfile
- Docker를 사용하여 어플리케이션을 컨테이너화하기 위한 설정 파일입니다. 이 파일은 어플리케이션을 실행하는 데 필요한 환경, 의존성 및 명령을 정의합니다.

### __pycache__
- Python이 코드를 실행할 때 생성하는 컴파일된 바이트코드 파일들이 저장되는 디렉토리입니다. 보통은 git 같은 버전 관리 시스템에 포함되지 않습니다.

### app
주요 어플리케이션 코드가 위치하는 디렉토리입니다.

#### __init__.py
- Python 패키지를 정의하기 위한 파일입니다. 이 파일이 있어야 해당 디렉토리를 Python 패키지로 인식하고 임포트할 수 있습니다.

#### main.py
- 어플리케이션의 진입점입니다. 여기서 FastAPI 앱 인스턴스를 생성하고, 라우터를 추가하며, 필요한 설정을 진행합니다.

#### requirements.txt
- 어플리케이션 실행에 필요한 Python 패키지들의 목록입니다.

### database
데이터베이스 관련 코드와 설정을 담는 디렉토리입니다.
  
#### database.py
- 데이터베이스 연결 및 세션 설정과 같은 데이터베이스 관련 설정이 포함된 파일입니다.

### models
데이터베이스 모델과 관련된 코드를 담는 디렉토리입니다.
    
#### user_model.py
- 사용자 데이터베이스 모델을 정의하는 파일입니다.

### routers
API의 라우터(엔드포인트)를 정의하는 파일들을 담는 디렉토리입니다.
    
#### authentication.py
- 사용자 인증과 관련된 엔드포인트 (가입, 로그인 등)를 정의하는 파일입니다.
    
#### users.py
- 사용자 정보와 관련된 엔드포인트를 정의하는 파일입니다.

### schemas
Pydantic 모델을 사용하여 API 요청 및 응답의 형태를 정의하는 디렉토리입니다.

#### user.py
- 사용자와 관련된 요청 및 응답 스키마를 정의하는 파일입니다.

### utils
어플리케이션 전체에서 재사용 가능한 유틸리티 함수들을 담는 디렉토리입니다.
    
#### email_utils.py
- 이메일 관련 기능 (예: 비밀번호 재설정 이메일 전송)을 지원하는 유틸리티 함수들을 포함하는 파일입니다.
