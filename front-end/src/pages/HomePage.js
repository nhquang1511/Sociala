import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import RightSidebar from "../components/RightSidebar";
import "../styles/Home.css";

function Home() {
    return (
        <div className="home">
            <Header />
            <div className="main">
                <Sidebar />
                <Feed />
                <RightSidebar />
            </div>
        </div>
    );
}
export default Home;
