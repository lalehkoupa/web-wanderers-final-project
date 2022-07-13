import React from "react";
import Footer from "../pages/Footer";
import HeaderAndNav from "../pages/HeaderAndNav";

const DefaultLayout = ( { children }) =>
{
	return (
		<>
			{/* mohammad put navbar in HeaderAndNav component and styled responsive*/}
			<HeaderAndNav/> 
			{children}
			<Footer />
		</>
	);
};

export default DefaultLayout;