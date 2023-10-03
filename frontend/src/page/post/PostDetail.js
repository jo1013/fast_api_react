import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const MetadataContainer = styled.div`
    margin-top: 20px;

    div {
        margin-bottom: 10px;
        font-size: 14px;
    }
`;

const PostContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 20px auto;
    border: 1px solid #e1e1e1;
    border-radius: 8px;
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 16px;
`;

const Content = styled.p`
    font-size: 18px;
    line-height: 1.5;
`;

const LikeButton = styled(Button)`
    margin-top: 20px;
    background-color: #007BFF;
    color: white;
    &:hover {
        background-color: #0056b3;
    }
`;

const PostDetail = (props) => {
    const [post, setPost] = useState(null);
    const { postId } = useParams(); // 여기에서 postId를 가져옵니다

    useEffect(() => {
        axios.get(`http://localhost:8000/post/${postId}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the post detail!", error);
            });
    }, [postId]);

    const handleLike = () => {
        axios.post(`http://localhost:8000/post/${postId}/like`)
            .then(response => {
                // If the backend returns the updated post object, use it.
                if(response.data && response.data.likes) {
                    setPost(prevState => ({
                        ...prevState,
                        likes: response.data.likes
                    }));
                }
            })
            .catch(error => {
                console.error("There was an error liking the post!", error);
            });
    };

    return post ? (
        <PostContainer>
            <Title>{post.title}</Title>
            <Content>{post.content}</Content>
            <LikeButton onClick={handleLike}>
                Like 
            </LikeButton>
            <MetadataContainer>
                <div><strong>조회수:</strong> {post.views}</div>
                <div><strong>작성 날짜:</strong> {post.created_at}</div>
                <div><strong>수정 날짜:</strong> {post.updated_at}</div>
                <div><strong>작성자 IP:</strong> {post.author_ip}</div>
                <div><strong>URL:</strong> {window.location.href}</div>
            </MetadataContainer>
        </PostContainer>
    ) : <p>Loading...</p>;
};

export default PostDetail;
