import React from 'react';
import PostList from './PostList';
import { Typography, Box, Button } from '@mui/material';

const PostMain = props => {
    const [likes, setLikes] = React.useState(0); 


    return (
        <Box mt={4} mb={4}>
            <Typography variant="h2" component="h1" gutterBottom align="center">
                Bulletin board
            </Typography>
            <Box display="flex" justifyContent="center" my={2}>
        
            </Box>
            <PostList />
        </Box>
    )
}

export default PostMain;
