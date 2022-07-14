import React, { useState } from "react";
import Button from "../atoms/Button";
import Form from "../molecules/Form";

const SignUp = ({ date, time, job }) => {
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    //password: "",
    phone: "",
  });

  date = " 10/07/22";
  time = " 12:00-15:00";
  job = " Kitchen Supervisor";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await fetch(" ", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (error) {
      console.log("Error", error);
      setError(error);
    }
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <div>
      <div className="sign-up">
        <div className="sign_up_info_banner">
          <h4>Sign Me Up For</h4>
          <div className="flex sign-up-date-time">
            <p>
              <span>Date:</span>
              {date}
            </p>
            <p>
              <span>Time:</span>
              {time}
            </p>
          </div>

          <p>
            <span>Volunteer Role:</span>
            {job}
          </p>
        </div>
        <div className="sign-up-fields">
          <h4>My Contact Info</h4>
          <p>All Fields are Mandatory*</p>
          <Form onSubmit={handleSubmit} onChange={handleChange} />
          {/* <div className="flex">
            <p>Already have an account?</p>
           <Button
              handleClick={handleLogin}
              text="Login"
              className="form-login-btn"
            />
          </div>*/}
          <Button
            handleClick={handleSubmit}
            text="Sign Up Now!"
            className="form-sign-up-btn"
          />
          {error ? <p>{error}</p> : null}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
