import React from "react";
import { useUserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import ResponsiveNav from "./ResponsiveNav";

const Header: React.FC = () => {
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
  return (
    <div className="header">
      <div>
        <p className="logo">Posting</p>
      </div>
      <ResponsiveNav />
      <div className="button-logout">
        <Button type="primary" onClick={handleSignOut}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Header;
