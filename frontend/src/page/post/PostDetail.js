import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

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
    const postId = props.match.params.id;

    useEffect(() => {
        axios.get(`http://localhost:8000/posts/${postId}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the post detail!", error);
            });
    }, [postId]);

    const handleLike = () => {
        axios.post(`http://localhost:8000/posts/${postId}/like`)
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
                Like {post.likes}
            </LikeButton>
        </PostContainer>
    ) : <p>Loading...</p>;
};

export default PostDetail;
