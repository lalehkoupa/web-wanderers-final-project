import React from "react";
import GoogleLogin from "../molecules/GoogleLogin";
import AdminLogin from "../molecules/AdminLogin";
import AdminSignUp from "../molecules/AdminSignUp";
import UseToken from "../molecules/UseToken";
import Button from "../atoms/Button";

const Dashboard = () => {
  let { token, setToken } = UseToken();

  const handleSignOut = () => {
    setToken("");
    localStorage.clear();
  };

  const loadPage = () => {
    return (
      <>
        {!token ? (
          <div>
            <GoogleLogin />
            <AdminLogin setToken={setToken} />
          </div>
        ) : (
          <div>
            <div className="admin-log-out-container">
              <h4>Hello {token}</h4>
              <Button
                text="Logout"
                handleClick={handleSignOut}
                className="sign-out-btn"
              />
            </div>
            <div>
              <AdminSignUp />
            </div>
          </div>
        )}
      </>
    );
  };

  return <div>{loadPage()}</div>;
};

export default Dashboard;
