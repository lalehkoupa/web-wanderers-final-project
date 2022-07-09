import React, { useState } from "react";
import Button from "../atoms/Button";
import Form from "../molecules/Form";

const SignUp = () => {
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleSubmit = async (event) => {
    console.log(form);
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

  return (
    <div>
      <Form formData={form} setFormData={setForm} />
      <Button handleClick={handleSubmit} text="Sign Up Now!" />
      {error ? <p>{error}</p> : null}
    </div>
  );
};

export default SignUp;
