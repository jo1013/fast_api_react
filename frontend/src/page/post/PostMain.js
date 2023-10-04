// useState 훅을 임포트합니다.
import React, { useState } from 'react';  
import PostList from './PostList';
import { Typography, Box, Button, TextField, Grid, Link } from '@mui/material';
import { useHistory } from 'react-router-dom';

const PostMain = props => {
    const [likes, setLikes] = useState(0); // 이미 임포트된 useState를 사용합니다.
    const [username, setUsername] = useState(""); // 이미 임포트된 useState를 사용합니다.
    const [password, setPassword] = useState(""); // 이미 임포트된 useState를 사용합니다.
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 이미 임포트된 useState를 사용합니다.

    const goToCreatePage = () => {
        history.push('/create');
    }

    const handleLogin = () => {
        setIsLoggedIn(true);
    }

    const handleSignUp = () => {
        history.push('/signup'); // 회원가입 페이지로 이동. 경로는 실제 회원가입 페이지 경로로 변경해야 함
    }


    return (
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <TextField 
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField 
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </Box>
                <Box mt={2}>
                    <Link component="button" variant="body2" onClick={handleSignUp}>
                        Sign Up
                    </Link>
                </Box>
                <Box mt={1}>
                    <Link component="button" variant="body2">
                        Forgot Username?
                    </Link>
                </Box>
                <Box mt={1}>
                    <Link component="button" variant="body2">
                        Forgot Password?
                    </Link>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="h2" component="h1" gutterBottom align="center">
                    Bulletin board
                </Typography>
                <Box display="flex" justifyContent="center" my={2}>
                    <Button variant="contained" color="primary" onClick={goToCreatePage}>
                        Create New Post
                    </Button>
                </Box>
                <PostList />
            </Grid>
        </Grid>
    )
}

export default PostMain;
