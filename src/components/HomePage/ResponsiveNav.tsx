import React, { useState } from "react";
import {
  MenuOutlined,
  HomeOutlined,
  UserOutlined,
  HeartOutlined,
  ReadOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/AuthContext";

const ResponsiveNav: React.FC = () => {
  const [responsive, setResponsive] = useState(false);

  const { signout }: any = useUserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signout();
      navigate("/login");
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const handleMenu = () => {
    setResponsive(!responsive);
  };
  return (
    <div className="responsive-nav-container">
      <MenuOutlined className="nav-icon-main" onClick={handleMenu} />
      {responsive ? (
        <div className="responsive-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "ResActiveNavbar" : "Navbar"
            }
          >
            <div className="responsive-nav-item">
              <HomeOutlined className="nav-icon" />
              <p>Home</p>
            </div>
          </NavLink>

          <NavLink
            to="/like"
            className={({ isActive }) =>
              isActive ? "ResActiveNavbar" : "Navbar"
            }
          >
            <div className="responsive-nav-item">
              <HeartOutlined className="nav-icon" />
              <p>Like</p>
            </div>
          </NavLink>

          <NavLink
            to="/bookmark"
            className={({ isActive }) =>
              isActive ? "ResActiveNavbar" : "Navbar"
            }
          >
            <div className="responsive-nav-item">
              <ReadOutlined className="nav-icon" />
              <p>Bookmark</p>
            </div>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "ResActiveNavbar" : "Navbar"
            }
          >
            <div className="responsive-nav-item">
              <UserOutlined className="nav-icon" />
              <p>Profile</p>
            </div>
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "ResActiveNavbar" : "Navbar"
            }
          >
            <div className="responsive-nav-item">
              <LogoutOutlined className="nav-icon" />
              <p onClick={handleSignOut}>Log out</p>
            </div>
          </NavLink>
        </div>
      ) : null}
    </div>
  );
};

export default ResponsiveNav;
