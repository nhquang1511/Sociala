import React from "react";
import "../styles/Header.css";
import { ReactComponent as HomeIcon } from "../assets/icons/home.svg";
import { ReactComponent as VideoIcon } from "../assets/icons/video.svg";
import { ReactComponent as MarketplaceIcon } from "../assets/icons/marketplace.svg";
import { ReactComponent as GroupsIcon } from "../assets/icons/groups.svg";
import { ReactComponent as GamingIcon } from "../assets/icons/gaming.svg";
import { ReactComponent as GridIcon } from "../assets/icons/grid.svg";
import { ReactComponent as MessengerIcon } from "../assets/icons/messenger.svg";
import { ReactComponent as NotificationIcon } from "../assets/icons/notification.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";

const Header = () => {
  return (
    <div className="header">
      {/* Logo and Search */}
      <div className="header-left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
          alt="Facebook Logo"
          className="header-logo"
        />
        <div className="header-search-bar">
          <SearchIcon className="header-search-icon" />
          <input
            type="text"
            placeholder="Search Facebook"
            className="header-search-input"
          />
        </div>
      </div>

      {/* Navigation Center */}
      <div className="header-center">
        <div className="header-nav-item active">
          <HomeIcon className="header-icon" />
        </div>
        <div className="header-nav-item">
          <VideoIcon className="header-icon" />
        </div>
        <div className="header-nav-item">
          <MarketplaceIcon className="header-icon" />
        </div>
        <div className="header-nav-item">
          <GroupsIcon className="header-icon" />
        </div>
        <div className="header-nav-item">
          <GamingIcon className="header-icon" />
        </div>
      </div>

      {/* Profile and Actions */}
      <div className="header-right">
        <div className="header-icon-circle">
          <GridIcon className="header-icon" />
        </div>
        <div className="header-icon-circle">
          <MessengerIcon className="header-icon" />
        </div>
        <div className="header-icon-circle">
          <NotificationIcon className="header-icon" />
        </div>
        <div className="header-profile">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="profile-picture"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
