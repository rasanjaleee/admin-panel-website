import React, { useState, useContext } from "react";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { DarkModeContext } from "../../context/darkMOdeContext";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: "New ride request",
      message: "John Doe requested a ride to Airport",
      time: "2 mins ago",
      unread: true,
    },
    {
      id: 2,
      title: "Payment received",
      message: "Payment of $45.50 received from Sarah",
      time: "15 mins ago",
      unread: true,
    },
    {
      id: 3,
      title: "Driver available",
      message: "Michael Chen is now available",
      time: "1 hour ago",
      unread: false,
    },
  ];

  // Sample messages
  const messages = [
    {
      id: 1,
      sender: "John Smith",
      message: "When will the driver arrive?",
      time: "5 mins ago",
      unread: true,
    },
    {
      id: 2,
      sender: "Admin Support",
      message: "Your account has been verified",
      time: "30 mins ago",
      unread: true,
    },
  ];

  return (
    <div className="navbar">
      <div className="wrapper">
        {/* Left Section - Search */}
        <div className="leftSection">
          <button className="menuBtn">
            <MenuOutlinedIcon />
          </button>
          <div className="search">
            <SearchOutlinedIcon className="searchIcon" />
            <input
              type="text"
              placeholder="Search rides, users, or transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="items">
          {/* Language Selector */}
          <div className="item">
            <button className="iconBtn" title="Language">
              <LanguageOutlinedIcon className="icon" />
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <div className="item">
            <button
              className="iconBtn"
              onClick={() => dispatch({ type: "TOGGLE" })}
              title="Toggle Dark Mode"
            >
              <DarkModeOutlinedIcon className="icon" />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <div className="item">
            <button
              className="iconBtn"
              onClick={toggleFullscreen}
              title="Toggle Fullscreen"
            >
              {isFullscreen ? (
                <FullscreenExitOutlinedIcon className="icon" />
              ) : (
                <FullscreenOutlinedIcon className="icon" />
              )}
            </button>
          </div>

          {/* Notifications */}
          <div className="item dropdown">
            <button
              className="iconBtn"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowMessages(false);
                setShowProfile(false);
              }}
              title="Notifications"
            >
              <NotificationsOutlinedIcon className="icon" />
              <div className="counter">
                {notifications.filter((n) => n.unread).length}
              </div>
            </button>

            {showNotifications && (
              <div className="dropdownMenu notificationsMenu">
                <div className="dropdownHeader">
                  <h4>Notifications</h4>
                  <button className="markAllRead">Mark all read</button>
                </div>
                <div className="dropdownBody">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notificationItem ${
                        notification.unread ? "unread" : ""
                      }`}
                    >
                      <div className="notificationContent">
                        <h5>{notification.title}</h5>
                        <p>{notification.message}</p>
                        <span className="time">{notification.time}</span>
                      </div>
                      {notification.unread && <div className="unreadDot"></div>}
                    </div>
                  ))}
                </div>
                <div className="dropdownFooter">
                  <button>View all notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="item dropdown">
            <button
              className="iconBtn"
              onClick={() => {
                setShowMessages(!showMessages);
                setShowNotifications(false);
                setShowProfile(false);
              }}
              title="Messages"
            >
              <ChatBubbleOutlineOutlinedIcon className="icon" />
              <div className="counter">
                {messages.filter((m) => m.unread).length}
              </div>
            </button>

            {showMessages && (
              <div className="dropdownMenu messagesMenu">
                <div className="dropdownHeader">
                  <h4>Messages</h4>
                </div>
                <div className="dropdownBody">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`messageItem ${
                        message.unread ? "unread" : ""
                      }`}
                    >
                      <div className="messageAvatar">
                        {message.sender.charAt(0)}
                      </div>
                      <div className="messageContent">
                        <h5>{message.sender}</h5>
                        <p>{message.message}</p>
                        <span className="time">{message.time}</span>
                      </div>
                      {message.unread && <div className="unreadDot"></div>}
                    </div>
                  ))}
                </div>
                <div className="dropdownFooter">
                  <button>View all messages</button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="item dropdown profileDropdown">
            <button
              className="profileBtn"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
                setShowMessages(false);
              }}
            >
              <img
                src="https://ui-avatars.com/api/?name=Admin+User&background=1e40af&color=fff&size=128"
                alt="Profile"
                className="avatar"
              />
              <div className="profileInfo">
                <span className="name">Admin User</span>
                <span className="role">Administrator</span>
              </div>
            </button>

            {showProfile && (
              <div className="dropdownMenu profileMenu">
                <div className="profileHeader">
                  <img
                    src="https://ui-avatars.com/api/?name=Admin+User&background=1e40af&color=fff&size=128"
                    alt="Profile"
                    className="profileAvatar"
                  />
                  <div className="profileDetails">
                    <h4>Admin User</h4>
                    <p>admin@rideping.com</p>
                  </div>
                </div>
                <div className="profileActions">
                  <button className="profileAction">
                    <AccountCircleOutlinedIcon />
                    <span>My Profile</span>
                  </button>
                  <button className="profileAction">
                    <SettingsOutlinedIcon />
                    <span>Settings</span>
                  </button>
                  <button className="profileAction logout">
                    <LogoutOutlinedIcon />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;