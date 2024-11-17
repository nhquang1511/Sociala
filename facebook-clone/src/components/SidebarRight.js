import React from "react";
import "../styles/SidebarRight.css"; // File CSS cho sidebar bên phải

const SidebarRight = () => {
  return (
    <div className="sidebar-right">
      <h3>Suggestions</h3>
      <ul>
        <li>Friend 1</li>
        <li>Friend 2</li>
        <li>Friend 3</li>
      </ul>
    </div>
  );
};

export default SidebarRight;
