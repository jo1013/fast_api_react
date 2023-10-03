import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button, Box, TextField, Typography } from '@mui/material';

const PostCreate = () => {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    const history = useHistory();
    const handleSubmit = () => {
        const postData = {
            title: title,
            content: content,
        };

        axios.post('http://localhost:8000/post/', postData)
        .then(response => {
          const postId = response.data.post_id;
          history.push(`/post/${postId}`);
      })
      
        .catch(error => {
            console.error("Error saving post:", error);
            // 에러 발생 시 처리 코드
        });
    }; // 이 부분의 중괄호가 불필요하게 중복되어 있었습니다.

    return (
        <Box mt={4}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Write a New Post
            </Typography>
            <Box mt={2}>
                <TextField 
                    fullWidth 
                    label="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Box>
            <Box mt={2}>
                <TextField 
                    fullWidth 
                    multiline 
                    rows={6} 
                    label="Content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                />
            </Box>
            <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        </Box>
    )
}

export default PostCreate;
