import React, { useState } from "react";
import Button from "../atoms/Button";
import Axios from "axios";
//import { useHistory } from "react-router-dom";

const AdminSignUp = ({ setSuccess }) => {
  const [formDataReg, setFormDataReg] = useState({
    emailReg: "",
    passwordReg: "",
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
    console.log(formDataReg);
  };

  const handleSubmit = async (event) => {
    // console.log("submit");
    // try {
    //   const response = await Axios.post("/api/login", formData);
    // } catch (err) {
    //   setError(err);
    // }

    event.preventDefault();
    if (
      !formDataReg.emailReg ||
      !formDataReg.passwordReg ||
      !formDataReg.repeatPassword
    ) {
      setError("It's mandatory to fill up all fields");
      return false;
    } else if (formDataReg.passwordReg !== formDataReg.repeatPassword) {
      setError("Both password should be same");
    } else {
      try {
        // await fetch(" ", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(formDataReg),
        // });
        //await Axios.post("/api/signUp", formDataReg);
        emptyFieldsReg();
        setSuccess(true);
      } catch (error) {
        console.log("Error", error);
        setError(error);
      }
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
            name="emailReg"
            value={formDataReg.emailReg}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            placeholder="Choose a password"
            type="password"
            name="passwordReg"
            value={formDataReg.passwordReg}
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
