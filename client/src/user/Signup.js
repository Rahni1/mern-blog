import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  // Signup.js
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        console.log("data: ", data);

        // if you need to check error from backend
        // else all exceptions are captured in catch block
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((exc) => {
        console.error("exc: ", exc);
        setValues({ ...values, error: exc.message, success: false });
      });
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const signUpForm = () => (
    <form>
    <div className="form-container">
    <h2 className="form-header">Sign Up</h2>
      <div className="form-group">
      <span className="input-icon">
       <i aria-hidden="true" class="user circle icon"></i>
       </span>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-input"
          placeholder="Name"
          value={name}
        />
      </div>

      <div className="form-group">
      <span className="input-icon">
      <i aria-hidden="true" class="mail icon"></i>
      </span>
        <input
          onChange={handleChange("email")}
          type="email"
          placeholder="Email"
          className="form-input"
          value={email}
        />
      </div>

      <div className="form-group">
      <span className="input-icon">
      <i aria-hidden="true" class="lock icon"></i>
      </span>
        <input
          onChange={handleChange("password")}
          type={passwordShown ? "text" : "password"}
          placeholder="Password"
          className="form-input"
          value={password}
        />
        <i onClick={togglePasswordVisiblity} aria-hidden="true" class="eye icon"></i>
      </div>
      <button onClick={clickSubmit} className="submit-auth">
        Submit
      </button>
      </div>
      {showError()}
      {showSuccess()}
    </form>
  );

  const showError = () => (
    <div
      className="auth-error"
      style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="success"
      style={{ display: success ? "" : "none" }}>
      New account is created. Please <Link className="success-link" to="/signin">Signin</Link>
    </div>
  );

  return (
 <div>
      {signUpForm()}
      </div>
  );
};

export default Signup;

