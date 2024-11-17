import React from "react";
import PostHeader from "./PostHeader.js";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import PostComments from "./PostComments";
import "../styles/Post.css";

function Post() {
  return (
    <div className="post">
      <PostHeader />
      <PostContent />
      <PostActions />
      <PostComments />
    </div>
  );
}

export default Post;
