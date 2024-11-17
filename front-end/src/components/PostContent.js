import React from "react";

function PostContent() {
  return (
    <div className="post__content">
      This is a sample post. Check out this photo!
      <img
        className="post__image"
        src="https://phunugioi.com/wp-content/uploads/2022/11/Hinh-nen-don-gian-ma-dep.jpg"
        alt="Sample"
      />
      <div className="post_so_luong_tuong_tac">
        <span className="post__likes">123 Likes</span>
        <span className="post__so_luong_comments">45 Comments</span>
        <span className="post__shares">10 Shares</span>
      </div>
    </div>
  );
}

export default PostContent;
