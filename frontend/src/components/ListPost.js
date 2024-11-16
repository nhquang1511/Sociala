// src/components/ListPost.js
import React from 'react';
import '../styles/ListPost.css';

const ListPost = ({ posts }) => {
  return (
    <div className="list-posts">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post">
            <div className="post-header">
            <div className="avatar">
                {/* Kiểm tra sự tồn tại của avatar */}
                {post.userId && post.userId.avatar ? (
                  <img src={post.userId.avatar} alt="Avatar" />
                ) : (
                  <img src="https://thuthuattienich.com/wp-content/uploads/2017/02/anh-dai-dien-facebook-doc-3.jpg" alt="Default Avatar" /> 
                )}
              </div>
              <div className="post-header-info">
                <div className="username">{post.userId.username}</div>
                <div className="post-time">{post.createdAt}</div>
              </div>
            </div>
            <div className="post-content">
              <p>{post.content}</p>
              {post.image && <img className="post-image" src={post.image} alt="Post" />}
            </div>
          </div>
        ))
      ) : (
        <p>No posts to show</p>
      )}
    </div>
  );
};

export default ListPost;
