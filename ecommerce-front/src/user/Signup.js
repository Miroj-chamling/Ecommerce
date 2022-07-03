import React, { useState } from "react";
import Layout from "../Core/Layout";
import { API } from "../config";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const signup = (user) => {
    fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    signup({ name, email, password });
  };

  const signupForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={handleChange("name")}
          className="form-control"
        ></input>
      </div>

      <div className="form-group">
        <label className="text-muted">email</label>
        <input
          type="email"
          onChange={handleChange("email")}
          className="form-control"
        ></input>
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange("password")}
          className="form-control"
        ></input>
      </div>

      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title="Signup"
      description="Signup to Ecommerce-App"
      className="container col-md-8 offset-md-2"
    >
      {signupForm()}
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Signup;
