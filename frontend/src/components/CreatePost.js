// src/components/CreatePost.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreatePost.css';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append('content', content);
      if (image) formData.append('image', image);

      // Gửi bài viết đến API (thay đổi URL với API thực tế của bạn)
      await axios.post('http://localhost:4000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Xử lý sau khi đăng bài (reset form hoặc thông báo thành công)
      setContent('');
      setImage(null);
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="create-post">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={handlePost}>Post</button>
    </div>
  );
};

export default CreatePost;
