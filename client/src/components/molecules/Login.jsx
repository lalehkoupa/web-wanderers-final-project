import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Button from "../atoms/Button";

const Login = () => {
  const [user, setUser] = useState({});
  const google = window.google;
  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT Id Token:" + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
    document.getElementById("profileImg").hidden = false;
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "581263519361-ov47r2q7v1j476gsdlr8phrbc41ltv2e.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    document.getElementById("profileImg").hidden = true;
    google.accounts.id.prompt();
  }, []);

  const handleSignOut = () => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
    document.getElementById("profileImg").hidden = true;
  };

  return (
    <div className="login-container">
      <div id="signInDiv"></div>
      <div className="google-login">
        {user && (
          <div className="flex user-details">
            <h4>{user.name}</h4>
            <img id="profileImg" src={user.picture} alt=""></img>
          </div>
        )}
        {Object.keys(user).length !== 0 && (
          <Button
            text="Sign Out"
            handleClick={handleSignOut}
            className="sign-out-btn"
          />
        )}
      </div>
    </div>
  );
};

export default Login;
