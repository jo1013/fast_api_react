import React from 'react';

const PostModal = ({ post, onClose }) => {
    if (!post) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '60%',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxSizing: 'border-box',
    }
};

export default PostModal;
