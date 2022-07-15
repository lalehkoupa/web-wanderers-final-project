import React from "react";
//import Input from "../atoms/Input";

const Form = ({ onSubmit, onChange }) => {
  return (
    <div>
      <form onSubmit={onsubmit} className="sign-up-form">
        <label htmlFor="firstName">First Name</label>
        <input
          name="firstName"
          type="text"
          onChange={(e) => onChange("firstName", e.target.value)}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          name="lastName"
          type="text"
          onChange={(e) => onChange("lastName", e.target.value)}
        />

        <label htmlFor="email">Email Address</label>
        <input
          name="email"
          type="email"
          onChange={(e) => onChange("email", e.target.value)}
        />

        {/*<label>Choose a Password </label>
        <input
          name="password"
          type="password"
          onChange={(e) => onChange("password", e.target.value)}
        />*/}

        <label>Phone Number </label>
        <input
          name="phone"
          type="tel"
          onChange={(e) => onChange("phone", e.target.value)}
        />
      </form>
    </div>
  );
};

export default Form;
