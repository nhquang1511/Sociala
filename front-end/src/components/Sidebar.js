import React from "react";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li>Home</li>
        <li>Friends</li>
        <li>Groups</li>
        <li>Marketplace</li>
        <li>Watch</li>
      </ul>
    </aside>
  );
}

export default Sidebar;
