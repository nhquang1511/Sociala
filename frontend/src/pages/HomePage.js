import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import CreatePost from '../components/CreatePost';
import ListPost from '../components/ListPost';
import '../styles/HomePage.css';
import axios from 'axios';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  // Hàm để lấy danh sách bài viết
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/posts/userPosts/',{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Lấy token từ localStorage
      }
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts(); // Lấy bài viết khi component được render
  }, []); // Chỉ chạy 1 lần khi component mount

  // Hàm để handle khi tạo bài viết thành công
  const handleNewPost = () => {
    fetchPosts(); // Tải lại danh sách bài viết sau khi tạo thành công
  };

  return (
    <div className="homepage">
      <Header />

      <div className="homepage-content">
        <SidebarLeft />
        <div className="center-column">
        <CreatePost onPostCreated={handleNewPost} /> {/* Chuyển hàm lên CreatePost */}
        <ListPost posts={posts} /> {/* Gửi danh sách bài viết xuống */}
        </div>
        <SidebarRight />
      </div>

    </div>
  );
};

export default HomePage;
