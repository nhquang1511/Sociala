import React from "react";

function PostHeader() {
  return (
    <div className="post__header">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
        alt="User Avatar"
        className="post__avatar"
      />
      <div className="post__info">
        <span className="post__username">User Name</span>
        <span className="post__time">2 hours ago</span>
      </div>
    </div>
  );
}

export default PostHeader;
