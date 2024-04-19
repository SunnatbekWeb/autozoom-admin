import React from "react";
import { FaRegUser } from "react-icons/fa6";

import "./Header.css";

const Header = () => {
  return (
    <header>
      <div></div>
      <div className="user">
        <div className="user_icon">
          <FaRegUser />
        </div>
        <span>{localStorage.getItem("userName")}</span>
      </div>
    </header>
  );
};

export default Header;
