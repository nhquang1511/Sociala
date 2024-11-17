import React from "react";
import "../styles/CreatePost.css"; // File CSS riêng cho CreatePost

const CreatePost = () => {
  return (
    <div className="create-post">
      <div className="create-post-top">
        <img
          src="https://via.placeholder.com/40" // Ảnh avatar
          alt="User Avatar"
          className="create-post-avatar"
        />
        <input
          type="text"
          placeholder="What's on your mind?"
          className="create-post-input"
        />
      </div>
      <div className="create-post-bottom">
        <button className="create-post-option">Photo/Video</button>
        <button className="create-post-option">Tag Friends</button>
        <button className="create-post-option">Feeling/Activity</button>
      </div>
    </div>
  );
};

export default CreatePost;
