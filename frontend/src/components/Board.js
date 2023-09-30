import React from 'react';
import Post from './Post';
import NewPostForm from './NewPostForm';

function Board() {
  // Dummy posts data. In real scenario, you can fetch data from server or manage using state.
  const posts = [
    { title: 'Post Title 1', content: 'This is the content for the first post.' },
    { title: 'Post Title 2', content: 'This is the content for the second post.' }
  ];

  return (
    <div>
      {posts.map((post, index) => (
        <Post key={index} title={post.title} content={post.content} />
      ))}
      <NewPostForm />
    </div>
  );
}

export default Board;
