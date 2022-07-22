import React from "react";
import GoogleLogin from "../molecules/GoogleLogin";
import AdminLogin from "../molecules/AdminLogin";
import AdminSignUp from "../molecules/AdminSignUp";
import UseToken from "../molecules/UseToken";
import Button from "../atoms/Button";

const Dashboard = () => {
  let { token, setToken } = UseToken();

  //clearing localStorage if user close the window
  window.onbeforeunload = () => {
    localStorage.clear();
  };

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
              <div className="flex">
                <h4>{token}</h4>
                <img
                  src={`${process.env.PUBLIC_URL}/image/login_profile-circled.svg`}
                  alt="loginProfile"
                  className="profile-image"
                />
              </div>

              <Button
                text="Logout"
                handleClick={handleSignOut}
                className="form-login-btn "
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
