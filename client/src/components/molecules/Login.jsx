import React, { useState } from "react";
import Button from "../atoms/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //const [errors, setErrors] = useState(false);

  const handleChange = (event) => {
    const newFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(newFormData);
    console.log(formData);
  };

  return (
    <div>
      <div className="login-form-container">
        <h3>Login</h3>
        <p>Welcome back, Please log in to your account</p>
        <form className="login-field-container">
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

          <Button type="submit" className="login-btn" text="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;
