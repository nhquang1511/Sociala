import React from "react";
import "../styles/CreateFeed.css";

function CreateFeed() {
  return (
    <div className="createFeed">
    <div className="createFeed__avatar">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="User Avatar" />
      </div>
      <input
        type="text"
        placeholder="What's on your mind?"
        className="createFeed__input"
      />
      <button className="createFeed__button">Post</button>
    </div>
  );
}

export default CreateFeed;
