import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavBar = () => {
  return (
    <div className="navbar-div">
      <Navbar
        collapseOnSelect
        expand="md"
        // variant="light"
        // style={{ width: "100%" }}
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Offcanvas id="responsive-navbar-nav text-dark">
          <Nav className="nav p-3">
            <Nav.Link href="/" className="navlink text-dark">
              Home
            </Nav.Link>
            <Nav.Link href="/about" className="navlink text-dark">
              About Us
            </Nav.Link>
            <Nav.Link href="/rota" className="navlink text-dark ">
              What we do
            </Nav.Link>
            <Nav.Link href="/signup" className="navlink text-dark ">
              What you can do
            </Nav.Link>
            <Nav.Link href="/contact" className="navlink text-dark ">
              Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Offcanvas>
      </Navbar>
    </div>
  );
};

export default NavBar;
