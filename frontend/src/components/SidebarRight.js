// src/components/SidebarRight.js
import React from 'react';
import '../styles/SidebarRight.css';

const SidebarRight = () => {
  const friends = [
    { id: 1, name: 'John Doe', avatar: 'https://placekitten.com/100/100' },
    { id: 2, name: 'Jane Smith', avatar: 'https://placekitten.com/101/100' },
    { id: 3, name: 'Bob Johnson', avatar: 'https://placekitten.com/102/100' },
    { id: 4, name: 'Alice Williams', avatar: 'https://placekitten.com/103/100' },
  ];

  return (
    <div className="sidebar-right">
      <h3>Friends</h3>
      <ul className="friend-list">
        {friends.map((friend) => (
          <li key={friend.id} className="friend-item">
            <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
            <span>{friend.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarRight;
