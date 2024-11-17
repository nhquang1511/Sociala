import React from "react";
import Header from "../components/Header";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import Feed from "../components/Feed";
import "../styles/HomePage.css"; // Thêm CSS nếu cần

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <div className="homepage-content">
        {/* Sidebar bên trái */}
        <SidebarLeft />

        {/* Khu vực nội dung chính (bài post) */}
        <Feed />

        {/* Sidebar bên phải */}
        <SidebarRight />
      </div>
    </div>
  );
};

export default HomePage;
