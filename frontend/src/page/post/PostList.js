import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostModal from './PostModal'; // 이 부분은 실제 PostModal 컴포넌트의 경로에 따라 변경해야 합니다.

const PostList = props => {
    const [dataList, setDataList] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/posts/')
            .then(response => {
                setDataList(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the posts!", error);
            });
    }, []);

    const handlePostClick = (post) => {
        setSelectedPost(post);
    }

    return (
        <div>
            {dataList.map((post, index) => (
                <div key={index} onClick={() => handlePostClick(post)}>
                    <h3>{post.title}</h3>

                </div>
            ))}
            {selectedPost && <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
        </div>
    );
}

export default PostList;
