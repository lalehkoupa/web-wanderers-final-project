import React, { useState } from "react";
import Button from "../atoms/Button";
import Axios from "axios";
//import { useHistory } from "react-router-dom";

const AdminLogin = ({ setToken }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const newFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(newFormData);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setError("It's mandatory to fill up all fields");
      return false;
    } else {
      try {
        // const response = await Axios.post("/api/login", formData);
        // const token = response.data.token;
        const token = { token: "test123" };
        //console.log(token);
        setToken(token);

        //window.localStorage.setItem("token", token);
        //useHistory.goBack();
      } catch (err) {
        setError(err);
      }
    }
  };

  return (
    <div className="login-sigUp-container">
      <div className="admin-form-container">
        <h3>Login</h3>
        <p>Welcome back, Please log in to your account</p>
        <form className="admin-form" onSubmit={handleLoginSubmit}>
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
          {error ? <span className="sign-up-err">{error}</span> : null}
          <Button type="submit" className="login-btn" text="Login" />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
