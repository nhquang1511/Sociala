import React from "react";
import "../styles/Story.css"; // File CSS riêng cho Story

const Story = () => {
  return (
    <div className="story">
      <div className="story-item">
        <img
          src="https://via.placeholder.com/100x150"
          alt="User Story"
          className="story-image"
        />
        <p className="story-user">User 1</p>
      </div>
      <div className="story-item">
        <img
          src="https://img3.thuthuatphanmem.vn/uploads/2019/06/13/anh-nen-anime-dep_095240141.jpg"
          alt="User Story"
          className="story-image"
        />
        <p className="story-user">User 2</p>
      </div>
      <div className="story-item">
        <img
          src="https://img3.thuthuatphanmem.vn/uploads/2019/06/13/anh-nen-anime-dep_095240141.jpg"
          alt="User Story"
          className="story-image"
        />
        <p className="story-user">User 3</p>
      </div>
    </div>
  );
};

export default Story;
