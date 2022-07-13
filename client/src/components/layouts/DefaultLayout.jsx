import React from "react";
import NavBar from "../pages/NavBar";
import Footer from "../pages/Footer";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
