import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "email@gmail.com",
    password: "password",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });
  const [passwordShown, setPasswordShown] = useState(false);

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  // higher order function
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  // Signin.js
  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
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
        // we log error
        setValues({ ...values, error: exc.message, loading: false });
      });
  };

const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const signUpForm = () => (
    <form>
       <div>
    <h2 className="form-header">Sign In</h2>
      <div className="form-group">
     <span className="input-icon">
       <i aria-hidden="true" class="user circle icon"></i>
       </span>
        <input
          onChange={handleChange("email")}
          type="email"
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
          className="form-input"
          value={password}
        />
  <i onClick={togglePasswordVisiblity} aria-hidden="true" class="eye icon"></i>
      </div>

      <button onClick={clickSubmit} className="signin">
        Submit
      </button>
          </div>
          {showError()}
    </form>
  )

  const showError = () => (
    <div
      className="signin-error"
      style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/blog" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/blog" />;
    }
  };

  return (
      <div>
      {showLoading()}
      {signUpForm()}
      {redirectUser()}
    </div>
  );
};

export default Signin;
