import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


const NavBar = () => {
  return (
  
      <div className="navbar-div">
      <Navbar collapseOnSelect expand="lg" variant="light" style={{ width: '100%' }}>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="nav" >
            <Nav.Link href="/" className='navlink text-danger'>Home</Nav.Link>
            <Nav.Link href="/about" className='navlink text-danger'>About Us</Nav.Link>
            <Nav.Link href="/rota" className='navlink text-danger'>What we do</Nav.Link>
            <Nav.Link href="/signup" className='navlink text-danger'>What you can do</Nav.Link>
            <Nav.Link href="/contact" className='navlink text-danger'>Contact Us</Nav.Link>
          </Nav>
           
          </Navbar.Collapse>
        </Navbar>
      </div>
    
  
  );
};

export default NavBar;
