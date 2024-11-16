// src/components/SidebarLeft.js
import React from 'react';
import '../styles/SidebarLeft.css';

const SidebarLeft = () => {
  return (
    <div className="sidebar-left">
      <h3>Navigation</h3>
      <ul>
        <li>Home</li>
        <li>Messages</li>
        <li>Groups</li>
        <li>Events</li>
        <li>Friends</li>
      </ul>
    </div>
  );
};

export default SidebarLeft;
