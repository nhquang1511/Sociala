import React from "react";
import "../styles/CommentsList.css"

const CommentsList = ({ comments }) => {
  return (
    <div className="comments-list">
      {comments.map((comment, index) => (
        <div key={index} className="comment-item">
          <span className="comment-username">{comment.username}</span>
          <p className="comment-text">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
