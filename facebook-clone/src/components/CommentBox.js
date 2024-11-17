import React, { useState } from "react";
import { ReactComponent as CommentIcon } from "../assets/icons/comment.svg"; // Icon comment

const CommentBox = ({ postId, onAddComment }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(postId, comment); // Gửi bình luận lên Parent (ListPost)
      setComment(""); // Xóa ô nhập sau khi gửi
    }
  };

  return (
    <div className="comment-box">
      <textarea
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="comment-input"
      />
      <button onClick={handleSubmit} className="comment-submit">
        <CommentIcon className="comment-icon" />
        Post
      </button>
    </div>
  );
};

export default CommentBox;
