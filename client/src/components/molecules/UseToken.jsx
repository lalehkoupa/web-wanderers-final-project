import { useState } from "react";

const UseToken = () => {

  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);

  const getToken = () => {
    return userToken?.token;
  };

  const getEmail = () => {
    return userToken?.email;
  };
 
  const [token, setToken] = useState(getToken());
  const [email, setEmail] = useState(getEmail());
 

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
  

    setToken(userToken.token);
    setEmail(userToken.email);
  };

  return {
    setToken: saveToken,
    token,
    email
  };
};
export default UseToken;
