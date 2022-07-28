import React, { useState } from "react";
//import GoogleLogin from "../molecules/GoogleLogin";
import AdminLogin from "../molecules/AdminLogin";
//import AdminSignUp from "../molecules/AdminSignUp";
import UseToken from "../molecules/UseToken";
import Button from "../atoms/Button";
import AdminPage from "./AdminPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  let { token, setToken } = UseToken();
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  console.log(token);
  const handleSignOut = () => {
    setToken("");
    localStorage.clear();
  };

  const handleSignUpSuccess = (isSuccess) => {
    setSuccess(isSuccess);
  };

  const handleSetEmail = (email) => {
    setEmail(email);
  };
  // const handleAddUser = () => {
  //   setSuccess(false);
  // };
  const loadPage = () => {
    return (
      <>
        {!token ? (
          <div>
            {/*<GoogleLogin />*/}
            <AdminLogin setToken={setToken} setEmail={handleSetEmail} />
          </div>
        ) : (
          <div>
            <div className="admin-log-out-container">
              <div className="flex">
                <h4>{email}</h4>
                {/* <img
                  src={`${process.env.PUBLIC_URL}/image/login_profile-circled.svg`}
                  alt="loginProfile"
                  className="profile-image"
                /> */}
                <FontAwesomeIcon icon={faCircleUser} className="fa-2x mx-2" />
              </div>

              <Button
                text="Logout"
                handleClick={handleSignOut}
                className="form-login-btn "
              />
            </div>
            <div>
              {!success ? <AdminPage setSuccess={handleSignUpSuccess} /> : ""}
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
