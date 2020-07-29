import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import logo from "../img/logo.png";

const Navbar = ({ history }) => {
  return (
    <ul className="navbar">
      <a class="navbar-brand" href="/">
        <img className="logo" src={logo} width="70px" height="70px" />
      </a>

      {/* ADMIN DASHBOARD */}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link className="nav-link" to="/admin/dashboard">
            Dashboard
          </Link>
        </li>
      )}

      {/* SIGNIN / SIGNUP */}
      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link className="nav-link" to="/signin">
              Signin
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Signup
            </Link>
          </li>
        </Fragment>
      )}
      {/* SIGNOUT */}
      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link"
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }>
            Signout
          </span>
        </li>
      )}
     {/* MY ARTICLES */}
     {isAuthenticated() && (
      <li className="nav-item">
        <Link className="nav-link" to="/myblog">
          My Articles
        </Link>
      </li>
    )}
    {/* CREATE A POST */}
    {isAuthenticated() && (
      <li className="nav-item">
        <Link className="nav-link" to="/new-post">
          Write a post
        </Link>
      </li>
    )}
    </ul>
  );
};

export default withRouter(Navbar);
