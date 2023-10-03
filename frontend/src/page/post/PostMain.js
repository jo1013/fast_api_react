import React from 'react';
import PostList from './PostList';
import { Typography, Box, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const PostMain = props => {
    const [likes, setLikes] = React.useState(0); 
    const history = useHistory();

    const goToCreatePage = () => {
        history.push('/create');
    }

    return (
        <Box mt={4} mb={4}>
            <Typography variant="h2" component="h1" gutterBottom align="center">
                Bulletin board
            </Typography>
            <Box display="flex" justifyContent="center" my={2}>
                <Button variant="contained" color="primary" onClick={goToCreatePage}>
                    Create New Post
                </Button>
            </Box>
            <PostList />
        </Box>
    )
}

export default PostMain;
