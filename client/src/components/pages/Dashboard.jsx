import React from "react";
import GoogleLogin from "../molecules/GoogleLogin";
import AdminLogin from "../molecules/AdminLogin";
import AdminSignUp from "../molecules/AdminSignUp";
import UseToken from "../molecules/UseToken";

const Dashboard = () => {
  let { token, setToken } = UseToken();

  const loadPage = () => {
    if (!token) {
      return (
        <div>
          <GoogleLogin /> <AdminLogin setToken={setToken} />
        </div>
      );
    } else {
      return (
        <div>
          <h3>Hello {token}</h3>
          <AdminSignUp />
        </div>
      );
    }
  };

  return <div>{loadPage()}</div>;
};

export default Dashboard;
