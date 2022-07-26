import React, { useState } from "react";
import GoogleLogin from "../molecules/GoogleLogin";
import AdminLogin from "../molecules/AdminLogin";
import AdminSignUp from "../molecules/AdminSignUp";
import UseToken from "../molecules/UseToken";
import Button from "../atoms/Button";
import AdminPage  from "./AdminPage"

const Dashboard = () => {
  let { token, setToken } = UseToken();
  const [success, setSuccess] = useState(false);

  //for clearing localStorage if user close the window
  // window.onbeforeunload = function () {
  //   localStorage.clear();
  // };

  const handleSignOut = () => {
    setToken("");
    localStorage.clear();
  };

  const handleSignUpSuccess = (isSuccess) => {
    setSuccess(isSuccess);
  };

  const handleAddUser = () => {
    setSuccess(false);
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
              {!success ?<AdminPage setSuccess={handleSignUpSuccess}/> :''}
              {/* {!success ? (
                
                <AdminSignUp setSuccess={handleSignUpSuccess} />
              ) : (
                <>
                  <p>
                    You have added a user Successfully, if you would like to add
                    another user click the Button
                  </p>
                  <Button text="Add Another User" handleClick={handleAddUser} />
                </>
              )} */}
            </div>
          </div>
        )}
      </>
    );
  };

  return <div>{loadPage()}</div>;
};

export default Dashboard;
