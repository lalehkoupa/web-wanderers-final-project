import React from "react";
import NavBar from "./NavBar";

import DesktopNavbar from "./DesktopNavbar";

const HeaderAndNav = () => {
  return (
    <div className="logoAndNav">
      <a href={"/"}>
        <div className="header-logo"></div>
      </a>
      <DesktopNavbar />
      <NavBar />
    </div>
  );
};

export default HeaderAndNav;
