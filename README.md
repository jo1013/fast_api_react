




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
