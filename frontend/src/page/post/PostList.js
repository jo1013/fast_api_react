import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardActionArea, CardContent, Typography, Grid, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/post/')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error("게시글을 불러오는데 오류가 발생했습니다!", error);
            });
    }, []);

    return (
        <Box mt={4} mb={4}>
 
            <Grid container spacing={4} justifyContent="center">
                {posts.map(post => (
                    <Grid item key={post.no} xs={12} sm={6} md={4}>
                        <Card>
                            <CardActionArea component={RouterLink} to={`/post/${post.no}`}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {post.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PostList;
