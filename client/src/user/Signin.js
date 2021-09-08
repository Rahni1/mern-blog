import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth";
import Navbar from '../core/Navbar'


const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });
  const [passwordShown, setPasswordShown] = useState(false);

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  // higher order function
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    signin({ email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              redirectToReferrer: true,
            });
          });
        }
      })
      .catch(exc => {
        console.error("+++ exc signin: ", exc);
        setValues({ ...values, error: exc.message, loading: false });
      });
  };

const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const signInForm = () => (
    <>
    <form className="form-container">
       <div>
    <h2 className="form-header">Sign In</h2>
      <div className="form-group">
     <span className="input-icon">
       <i aria-hidden="true" className="user circle icon"></i>
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
       <i aria-hidden="true" className="lock icon"></i>
       </span>
        <input     
        placeholder="Password"    
          onChange={handleChange("password")}
          type={passwordShown ? "text" : "password"}
          className="form-input"
          value={password}
        />
  <i onClick={togglePasswordVisiblity} aria-hidden="true" className="eye icon"></i>
      </div>

      <button onClick={clickSubmit} className="submit-auth">
        Submit
      </button>
    <p className="no-account">Don't have an account yet? <Link className="signup-link" to="/signup">Sign Up</Link></p>
          </div>
          {showLoading()}
          {showError()}
    </form>
    </>
  )

  const showError = () => (
    <div
      className="auth-error"
      style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="loader">
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
      <div>
      <Navbar />
      {signInForm()}
      {redirectUser()}
    </div>
  );
};

export default Signin;
