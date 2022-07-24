import React, { useState } from "react";
import Button from "../atoms/Button";
import Form from "../molecules/Form";
import { useParams } from "react-router-dom";

const SignUp = () => {
  let { id, jobTitle, date, time } = useParams();
  console.log(id, jobTitle, date, time);

  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    //password: "",
    phone: "",
  });

  // date = date;
  // time = " 12:00-15:00";
  const job = jobTitle;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (validateForm()) {
      try {
        // await fetch(" ", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(form),
        // });
        //console.log(form);
        //console.log("submit");
        emptyFields();
      } catch (error) {
        console.log("Error", error);
        setError(error);
      }
    }
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const validateForm = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      setError("It's mandatory to fill up all fields");
      return false;
    } else if (!form.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setError("Please enter the valid email address");
      return false;
    } else {
      return true;
    }
  };

  const emptyFields = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      //password: "",
      phone: "",
    });
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
          <Form onChange={handleChange} formData={form} />
          {/* <div className="flex">
            <p>Already have an account?</p>
           <Button
              handleClick={handleLogin}
              text="Login"
              className="form-login-btn"
            />
          </div>*/}
          {error ? <p className="sign-up-err">{error}</p> : null}
          <Button
            handleClick={handleSubmit}
            text="Sign Up Now!"
            className="form-sign-up-btn"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
