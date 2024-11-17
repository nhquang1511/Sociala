import React from "react";
import "../styles/Feed.css"; // File CSS chính của Feed
import CreatePost from "./CreatePost";
import Story from "./Story";
import ListPost from "./ListPost";

const Feed = () => {
    return (
        <div className="feed">


            {/* Create Post */}
            <CreatePost />
            {/* Story */}
            <Story />
            {/* List of Posts */}
            <ListPost />
        </div>
    );
};

export default Feed;
