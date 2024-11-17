import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <h2 className="logo">Facebook</h2>
      </div>
      <div className="header-center">
        <input
          type="text"
          placeholder="Search Facebook..."
          className="search-bar"
        />
      </div>
      <div className="header-right">
        <button className="profile-btn">Profile</button>
      </div>
    </div>
  );
};

export default Header;
