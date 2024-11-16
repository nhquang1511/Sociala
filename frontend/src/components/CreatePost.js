import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreatePost.css';

const CreatePost = ({ onPostCreated }) => { // Nhận prop onPostCreated từ HomePage
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handlePost = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('content', content);
      if (image) formData.append('image', image);

      // Gửi bài viết đến API
      await axios.post('http://localhost:4000/api/posts/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      // Reset form và thông báo thành công
      setContent('');
      setImage(null);
      alert('Post created successfully!');

      // Gọi hàm để tải lại bài viết
      onPostCreated();
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
