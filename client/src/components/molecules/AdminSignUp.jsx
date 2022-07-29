import React, { useState } from "react";
import Button from "../atoms/Button";

const AdminSignUp = () => {
  const [formDataReg, setFormDataReg] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState(false);


  const handleChange = (event) => {
    const newFormData = {
      ...formDataReg,
      [event.target.name]: event.target.value,
    };
    setFormDataReg(newFormData);
    setError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !formDataReg.email ||
      !formDataReg.password ||
      !formDataReg.repeatPassword
    ) {
      setError("It's mandatory to fill up all fields");
      return false;
    } 
    if (formDataReg.password!== formDataReg.repeatPassword) {
      setError("Both password should be same");
      return false;
    } 
      try {
        const res= await fetch("http://localhost:4000/api/auth/registerAdmin", {
 
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(formDataReg),
       });
        const resData = await res.json();
        
      setError(resData.msg);
      emptyFieldsReg();
        
      } catch (error) {
        console.log("Error", error);
        setError(error);
      }
  };

  const emptyFieldsReg = () => {
    setFormDataReg({
      email: "",
      password: "",
      repeatPassword: "",
    });
  };

  return (
    <div className="login-sigUp-container">
      <div className="admin-form-container">
        <h3>Create New User</h3>
        <p>Please Sign Up here </p>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            placeholder="Enter your email"
            type="email"
            autoComplete="off"
            name="email"
            value={formDataReg.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            placeholder="Choose a password"
            type="password"
            name="password"
            value={formDataReg.password}
            onChange={handleChange}
          />
          <label>Repeat Password</label>
          <input
            placeholder="Repeat your password"
            type="password"
            name="repeatPassword"
            value={formDataReg.repeatPassword}
            onChange={handleChange}
          />
          {error ? <span className="sign-up-err">{error}</span> : null}
          <Button type="submit" className="login-btn" text="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default AdminSignUp;
