import React from "react";

function PostComments() {
  return (
    <div className="post__comments">
      <div className="comment">
        <span className="comment__user">User 1:</span>
        <span className="comment__text">Great post!</span>
      </div>
      <div className="comment">
        <span className="comment__user">User 2:</span>
        <span className="comment__text">I agree!</span>
      </div>
      <input
        type="text"
        placeholder="Write a comment..."
        className="comment__input"
      />
    </div>
  );
}

export default PostComments;
