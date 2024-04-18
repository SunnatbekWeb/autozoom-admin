import React from "react";
import { FaRegUser } from "react-icons/fa6";

import "./Header.css";

const Header = () => {
  return (
    <header>
        <a href="/">Avtozoomadmin</a>
      <div className="user">
        <div className="user_icon">
          <FaRegUser />
        </div>
        <span>John Doe</span>
      </div>
    </header>
  );
};

export default Header;
