import React, { useEffect, useState } from 'react';



const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Giả lập dữ liệu bài đăng
    const samplePosts = [
      { id: 1, username: 'John Doe', content: 'This is my first post!' },
      { id: 2, username: 'Jane Smith', content: 'Hello world!' },
    ];
    setPosts(samplePosts);
  }, []);

  return (
    <div className="feed">
         xin chào
    </div>
  );
};

export default Feed;
