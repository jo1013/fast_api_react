import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';  // Material-UI의 버튼 컴포넌트를 임포트합니다.
import styled from '@emotion/styled';

// 스타일링
const LikeButton = styled(Button)`
    background-color: #ff4081;  // 버튼의 배경색을 지정합니다.
    color: #fff;  // 버튼의 글씨색을 지정합니다.
    margin-top: 10px;  // 상단 여백을 지정합니다.
    &:hover {
        background-color: #f33c74;  // 마우스를 올렸을 때의 배경색을 지정합니다.
    }
`;

const Post = ({ post, onLike }) => {
    const handleLike = () => {
        // 백엔드에 "좋아요" 요청을 보냅니다.
        axios.post(`http://localhost:8000/post/${post.no}/like`)
            .then(response => {
                // 부모 컴포넌트에게 "좋아요" 추가를 알립니다.
                onLike(post.no);
            })
            .catch(error => {
                console.error("There was an error liking the post!", error);
            });
    };

    return (
        <div>
            <Link to={`/post/${post.no}`}><h3>{post.title}</h3></Link>
            <LikeButton variant="contained" onClick={handleLike}>Like </LikeButton>
        </div>
    );
};

export default Post;
