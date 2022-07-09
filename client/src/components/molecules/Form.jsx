import React from "react";
import Input from "../atoms/Input";

const Form = ({ formData, setFormData }) => {
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div>
      {Object.entries(formData).map((formField, index) => (
        <Input
          key={index}
          placeholder={formField[0]}
          value={formField[1]}
          type={
            formField[0].includes("email")
              ? "email"
              : formField[0].includes("password")
              ? "password"
              : formField[0].includes("phone")
              ? "tel"
              : "text"
          }
          handleChange={(event) =>
            handleChange(formField[0], event.target.value)
          }
        />
      ))}
    </div>
  );
};

export default Form;
