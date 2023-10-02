import React from 'react';
import PostList from './PostList';
import Button from '@mui/material/Button';

const styles = {
    // ... 기존 스타일 설정
    likeButton: {
        margin: '10px 0',
        backgroundColor: '#007BFF',
        color: 'white'
    }
};

const PostMain = props => {
    const [likes, setLikes] = React.useState(0); // 예시를 위한 로컬 상태. 실제로는 백엔드에서 가져올 것.

    const handleLike = () => {
        // 여기에서 백엔드 API를 호출하여 좋아요를 추가
        setLikes(likes + 1);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>게시판</h2>
            <Button style={styles.likeButton} onClick={handleLike}>
                좋아요 {likes}
            </Button>
            <PostList />
        </div>
    )
}

export default PostMain;
