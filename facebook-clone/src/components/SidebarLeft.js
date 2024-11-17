import React from "react";
import "../styles/SidebarLeft.css"; // File CSS cho sidebar bên trái

const SidebarLeft = () => {
  return (
    <div className="sidebar-left">
      <ul>
        <li>Home</li>
        <li>Profile</li>
        <li>Friends</li>
        <li>Messages</li>
      </ul>
    </div>
  );
};

export default SidebarLeft;
