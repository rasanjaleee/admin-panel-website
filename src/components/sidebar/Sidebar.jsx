import React, { useContext, useState } from "react";
import "./Sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Groups2Icon from "@mui/icons-material/Groups2";
import PeopleIcon from "@mui/icons-material/People";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Link, useLocation } from "react-router-dom";
import { DarkModeContext } from "../../context/darkMOdeContext";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const location = useLocation();

  // Helper function to check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      {/* Logo Section */}
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo-container">
            <DirectionsCarIcon style={{ fontSize: 32, color: "#3b82f6" }} />
            <span className="logo">
              <span style={{ color: "#3b82f6" }}>RIDE</span>
              <span style={{ color: "#06b6d4" }}>PING</span>
            </span>
          </div>
        </Link>
      </div>

      <hr />

      {/* Navigation Menu */}
      <div className="center">
        <ul>
          {/* MAIN Section */}
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className={isActive("/") ? "active" : ""}>
              <DashboardIcon />
              <span>Dashboard</span>
            </li>
          </Link>

          {/* LIST Section */}
          <p className="title">LIST</p>
          <Link to="/passengers" style={{ textDecoration: "none" }}>
            <li className={isActive("/passengers") ? "active" : ""}>
              <Groups2Icon />
              <span>Passengers</span>
            </li>
          </Link>

          <Link to="/riders" style={{ textDecoration: "none" }}>
            <li className={isActive("/riders") ? "active" : ""}>
              <PeopleIcon />
              <span>Riders</span>
            </li>
          </Link>

          <Link to="/rideReq" style={{ textDecoration: "none" }}>
            <li className={isActive("/rideReq") ? "active" : ""}>
              <LocalShippingIcon />
              <span>Rides</span>
            </li>
          </Link>

          <Link to="/earnings" style={{ textDecoration: "none" }}>
            <li className={isActive("/earnings") ? "active" : ""}>
              <MonetizationOnIcon />
              <span>Earnings</span>
            </li>
          </Link>

          {/* USEFUL Section */}
          <p className="title">USEFUL</p>
          <Link to="/status" style={{ textDecoration: "none" }}>
            <li className={isActive("/status") ? "active" : ""}>
              <LeaderboardIcon />
              <span>Status</span>
            </li>
          </Link>

          <Link to="/notification" style={{ textDecoration: "none" }}>
            <li className={isActive("/notification") ? "active" : ""}>
              <NotificationsActiveOutlinedIcon />
              <span>Notification</span>
            </li>
          </Link>

          {/* SERVICES Section */}
          <p className="title">SERVICES</p>
          <Link to="/system-health" style={{ textDecoration: "none" }}>
            <li className={isActive("/system-health") ? "active" : ""}>
              <LocalHospitalOutlinedIcon />
              <span>System Health</span>
            </li>
          </Link>

          <Link to="/logs" style={{ textDecoration: "none" }}>
            <li className={isActive("/logs") ? "active" : ""}>
              <InputOutlinedIcon />
              <span>Logs</span>
            </li>
          </Link>

          <Link to="/settings" style={{ textDecoration: "none" }}>
            <li className={isActive("/settings") ? "active" : ""}>
              <SettingsApplicationsOutlinedIcon />
              <span>Settings</span>
            </li>
          </Link>

          {/* USER Section */}
          <p className="title">USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li className={isActive("/profile") ? "active" : ""}>
              <AccountBoxRoundedIcon />
              <span>Profile</span>
            </li>
          </Link>

          <Link to="/logout" style={{ textDecoration: "none" }}>
            <li className={isActive("/logout") ? "active" : ""}>
              <LogoutRoundedIcon />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>

      {/* Theme Toggle */}
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
          title="Light Mode"
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
          title="Dark Mode"
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;