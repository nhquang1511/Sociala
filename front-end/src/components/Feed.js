import React from "react";
import CreateFeed from "../components/CreateFeed";
import Story from "../components/Story";
import ListPost from "../components/ListPost";
import "../styles/Feed.css";

function Feed() {
    return (
        <div className="feed">
            <div className="createfeed"><CreateFeed /></div>
            <div className="story"><Story /></div>
            <div className="listpost"><ListPost /></div>
        </div>
    );
}

export default Feed;
