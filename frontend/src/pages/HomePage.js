// src/pages/HomePage.js
import React from 'react';
import Header from '../components/Header';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import Feed from '../components/Feed';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <div className="homepage-content">
        <SidebarLeft />
        <Feed />
        <SidebarRight />
      </div>
    </div>
  );
};

export default HomePage;
