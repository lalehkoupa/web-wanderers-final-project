import React from "react";

const Input = ({ placeholder, label, value, type, handleChange }) => (
  <div>
    {label ? <p>{label}</p> : null}
    <input
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={handleChange}
    />
  </div>
);

export default Input;
