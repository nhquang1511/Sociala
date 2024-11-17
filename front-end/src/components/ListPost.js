import React from "react";
import Post from "../components/Post"; // Đảm bảo đã có component Post
import "../styles/ListPost.css";

function ListPost() {
    return (
        <div className="listPost">
            <Post />
            <Post />
        </div>
    );
}

export default ListPost;
