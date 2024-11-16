// src/pages/HomePage.js
import React from 'react';
import Header from '../components/Header';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import ListPost from '../components/ListPost'; // Đảm bảo ListPost được import
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <div className="homepage-content">
        <SidebarLeft />
        <div className="center-column">
          {/* Chỉ render ListPost ở giữa */}
          <ListPost />
        </div>
        <SidebarRight />
      </div>
    </div>
  );
};

export default HomePage;
