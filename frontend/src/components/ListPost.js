import React from 'react';
import '../styles/ListPost.css';


const ListPost = ({ posts }) => {
    return (
      <div className="list-post">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h4>{post.username}</h4>
            <p>{post.content}</p>
            
            {/* Hiển thị ảnh nếu có trong bài viết */}
            {post.image && (
              <img src={post.image} alt="Post content" className="post-image" />
            )}
            <div>Likes: {post.likes}</div>
            <div></div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ListPost;
  