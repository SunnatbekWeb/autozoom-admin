import React from "react";
import { FaRegUser } from "react-icons/fa6";

const Header = () => {
  return (
    <header>
      <div>
        <a href="/">Avtozoomadmin</a>
      </div>
      <div>
        <FaRegUser />
        <span>John Doe</span>
      </div>
    </header>
  );
};

export default Header;
