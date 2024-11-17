import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreatePost.css';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first!');
      return;
    }

    try {
      setLoading(true);
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

      // Sau khi gửi thành công, reset form và gọi lại hàm onPostCreated
      setContent('');
      setImage(null);
      onPostCreated(); // Gọi hàm để tải lại danh sách bài viết
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post">
      <div className="create-post-container">
        {/* Form nhập nội dung bài viết */}
        <div className="post-input-container">
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
          <button onClick={handlePost} disabled={loading}>
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
