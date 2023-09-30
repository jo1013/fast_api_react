import React, { useState } from 'react';

function NewPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can manage state or make API calls to save the new post
    console.log('New post:', title, content);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="5" required />
      </div>
      <button type="submit">Add Post</button>
    </form>
  );
}

export default NewPostForm;
