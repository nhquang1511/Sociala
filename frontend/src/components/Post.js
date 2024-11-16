// src/components/Post.js
import React from 'react';
import moment from 'moment';
import '../styles/Post.css';

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="post-header">
        <img
          src={post.userId.avatar || 'default-avatar.jpg'}
          alt="User Avatar"
          className="avatar"
        />
        <div className="post-header-info">
          <span className="username">{post.userId.username}</span>
          <span className="post-time">{moment(post.createdAt).fromNow()}</span>
        </div>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="Post" className="post-image" />}
      </div>
    </div>
  );
};

export default Post;
