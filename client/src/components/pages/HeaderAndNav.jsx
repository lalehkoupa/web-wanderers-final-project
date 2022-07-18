import React from "react";
import NavBar from "./NavBar";

const HeaderAndNav = () => {
  return (
    <div className="logoAndNav">
      <a href={"/"}>
        <div class="header-logo"></div>
      </a>
      <div className="navigation-div">
        <ul className="nav-items">
          <li>home</li>
          <li>cont</li>
          <li>how to help</li>
          <li>some</li>
        </ul>
      </div>

      <NavBar />
    </div>
  );
};

export default HeaderAndNav;
