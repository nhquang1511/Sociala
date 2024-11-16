// src/components/ListPost.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post'; // Giả sử đã có component Post
import '../styles/ListPost.css';

const ListPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/posts/userPosts/',{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Lấy token từ localStorage
            }
        }); // Thay URL với API thực tế của bạn
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="list-posts">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default ListPost;
