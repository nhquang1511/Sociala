import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SidebarLeft from '../components/SidebarLeft';
import Feed from '../components/Feed';
import SidebarRight from '../components/SidebarRight';
import axios from 'axios'; // Sử dụng axios để gọi API
import '../styles/HomePage.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]); // State để lưu danh sách bài viết
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Khai báo hàm fetchPosts
  const fetchPosts = async () => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem('token'); 

      // Kiểm tra nếu token không tồn tại
      if (!token) {
        setError('Authentication failed. Please log in.');
        setLoading(false);
        return;
      }

      // Gửi request với Authorization header
      const response = await axios.get('http://localhost:4000/api/posts/userPosts/', {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong Authorization header
        },
      });

      setPosts(response.data); // Lưu danh sách bài viết vào state
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load posts. Please try again.');
      console.error(err);
    } finally {
      setLoading(false); // Đánh dấu hoàn thành việc tải dữ liệu
    }
  };

  // Tải bài viết khi page được load
  useEffect(() => {
    fetchPosts();
  }, []); // Gọi fetchPosts khi component mount lần đầu

  // Hiển thị loading hoặc lỗi nếu cần
  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="homepage">
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <div className="homepage-content">
        <SidebarLeft />

        {/* Truyền danh sách bài viết và hàm fetchPosts xuống Feed */}
        <Feed posts={posts} fetchPosts={fetchPosts} />

        <SidebarRight />
      </div>
    </div>
  );
};

export default HomePage;
