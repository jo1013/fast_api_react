
# React Simple Blog

간단한 리액트 기반의 블로그 애플리케이션입니다.

## 주요 특징

- **게시글 목록**: `PostList` 컴포넌트를 사용하여 게시글 목록을 보여줍니다.
- **게시글 디자인**: 각 게시글의 제목은 Material-UI를 사용하여 디자인되었습니다.
- **메인 화면**: 게시판 메인 화면은 `PostMain` 컴포넌트를 통해 디스플레이됩니다.
- **좋아요 기능**: 게시판의 메인 화면은 간단한 "좋아요" 기능을 포함하고 있습니다.

## 사용된 기술

- **React**: 메인 프론트엔드 프레임워크로 사용됩니다.
- **axios**: API 호출을 위해 사용됩니다.
- **Material-UI**: UI 컴포넌트 및 스타일링에 사용되었습니다.
- **Docker**: 애플리케이션을 컨테이너화하기 위해 사용되었습니다.

## 개발 중 발생한 이슈

- **빌드 오류**: 게시글 빌드 중 `import`와 `export`에 관련된 문제가 발생하였습니다. 이는 컴포넌트 코드의 문법 오류를 수정하여 해결하였습니다.

## 활용 가이드

1. 프로젝트를 클론하세요.





















------------------------------------------------------------------------

table ddl




```
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
```
```
CREATE INDEX idx_users_email ON users(email); -- 이메일로의 빠른 조회를 위한 인덱스
```


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
