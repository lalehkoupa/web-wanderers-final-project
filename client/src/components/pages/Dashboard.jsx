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
  let { token, email, setToken } = UseToken();
  const [adminType, setAdminType] = useState("");

  const [success, setSuccess] = useState(false);

  const handleSignOut = () => {
    setToken("");
    localStorage.clear();
  };

  const handleSignUpSuccess = (isSuccess) => {
    setSuccess(isSuccess);
  };

  const handleSetAdminType = (adminType) => {
    setAdminType(adminType);
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
            <AdminLogin setToken={setToken} setAdminType={handleSetAdminType} />
          </div>
        ) : (
          <div>
            <div className="admin-log-out-container">
              <div className="flex">
                <h4>{email}</h4>
                <FontAwesomeIcon icon={faCircleUser} className="fa-2x mx-2" />
              </div>

              <Button
                text="Logout"
                handleClick={handleSignOut}
                className="form-login-btn "
              />
            </div>
            <div>
              {!success ? (
                <AdminPage setSuccess={handleSignUpSuccess} type={adminType} />
              ) : (
                ""
              )}
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
