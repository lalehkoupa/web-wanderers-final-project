import React, { useState } from "react";
import Button from "../atoms/Button";
import Axios from "axios";
//import { useHistory } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  // const [formDataReg, setFormDataReg] = useState({
  //   email: "",
  //   password: "",
  //   confirmedPassword: "",
  // });

  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const newFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(newFormData);
    console.log(formData);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    console.log("submit");
    try {
      const response = await Axios.post("/api/login", formData);
      const token = response.data.token;
      console.log("token");
      window.localStorage.setItem("token", token);
      //useHistory.goBack();
    } catch (err) {
      setError(err);
    }
  };

  const handleSignUpSubmit = async (event) => {
    // event.preventDefault();

    // console.log("submit");
    // try {
    //   const response = await Axios.post("/api/login", formData);
    // } catch (err) {
    //   setError(err);
    // }

    event.preventDefault();
    setError(null);

    try {
      await fetch(" ", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      emptyFieldsReg();
    } catch (error) {
      console.log("Error", error);
      setError(error);
    }
  };

  const emptyFieldsReg = () => {
    setFormData({
      email: "",
      password: "",
      confirmedPassword: "",
    });
  };

  return (
    <div className="flex login-sigUp-container">
      <div className="login-form-container">
        <h3>Login</h3>
        <p>Welcome back, Please log in to your account</p>
        <form className="login-field-container" onSubmit={handleLoginSubmit}>
          <label>Email</label>
          <input
            placeholder="Enter your email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            placeholder="Choose a password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {error ? <p className="sign-up-err">{error}</p> : null}
          <Button type="submit" className="login-btn" text="Login" />
        </form>
      </div>

      <div className="login-form-container">
        <h3>Sign Up</h3>
        <p>Please Sign Up here </p>
        <form className="login-field-container" onSubmit={handleSignUpSubmit}>
          <label>Email</label>
          <input
            placeholder="Enter your email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            placeholder="Choose a password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label>Repeat Password</label>
          <input
            placeholder="Repeat your password"
            type="password"
            name="repeatPassword"
            value={formData.password}
            onChange={handleChange}
          />
          {error ? <p className="sign-up-err">{error}</p> : null}
          <Button type="submit" className="login-btn" text="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default Login;
