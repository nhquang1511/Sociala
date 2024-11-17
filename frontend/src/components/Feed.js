import React from 'react';
import ListPost from './ListPost';
import CreatePost from './CreatePost';
import '../styles/Feed.css';


const Feed = ({ posts, fetchPosts }) => {
  return (
    <div className="feed">
      {/* Truyền fetchPosts vào CreatePost */}
      <CreatePost onPostCreated={fetchPosts} />

      {/* Danh sách bài viết */}
      <ListPost posts={posts} />
    </div>
  );
};

export default Feed;
