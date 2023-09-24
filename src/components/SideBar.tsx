import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import {
  UserOutlined,
  HomeOutlined,
  HeartOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const SideBar: React.FC<any> = () => {
  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      width={250}
      className="sider"
    >
      <div className="demo-logo-vertical" />

      <Menu
        theme="dark"
        mode="inline"
        style={{ marginTop: "30px" }}
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item key="1">
          <Link to="/">
            <HomeOutlined className="sidebar-icon" />
            <label className="label-sidebar"> Home</label>
          </Link>
        </Menu.Item>

        <Menu.Item key="2">
          <Link to="/like">
            <HeartOutlined className="sidebar-icon" />
            <label className="label-sidebar">Like</label>
          </Link>
        </Menu.Item>

        <Menu.Item key="3">
          <Link to="/bookmark">
            <ReadOutlined className="sidebar-icon" />
            <label className="label-sidebar">Bookmark</label>
          </Link>
        </Menu.Item>

        <Menu.Item key="4">
          <Link to="/profile">
            <UserOutlined className="sidebar-icon" />
            <label className="label-sidebar">Profile</label>
          </Link>
        </Menu.Item>
      </Menu>

      {/* <Menu
        theme="dark"
        mode="inline"
        style={{ marginTop: "30px" }}
        onClick={({ key }) => {
          navigate(key);
        }}
        defaultSelectedKeys={["/"]}
      >
        <Menu.Item key="/">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "ActiveNavbar" : "Navbar")}
          >
          <HomeOutlined className="sidebar-icon" />
          <label className="label-sidebar"> Home</label>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="/like">
          <NavLink
            to="/like"
            className={({ isActive }) => (isActive ? "ActiveNavbar" : "Navbar")}
          >
          <HeartOutlined className="sidebar-icon" />
          <label className="label-sidebar">Like</label>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="/bookmark">
          <NavLink
            to="/bookmark"
            className={({ isActive }) => (isActive ? "ActiveNavbar" : "Navbar")}
          >
            <ReadOutlined className="sidebar-icon" />
            <label className="label-sidebar">Bookmark</label>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="/profile">
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "ActiveNavbar" : "Navbar")}
          >
            <UserOutlined className="sidebar-icon" />
            <label className="label-sidebar">Profile</label>
          </NavLink>
        </Menu.Item>
      </Menu> */}
    </Sider>
  );
};

export default SideBar;
