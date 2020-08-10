import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import logo from "../img/logo.png";

const Navbar = ({ history }) => {
const {
  user: { _id },
} = isAuthenticated();
return (
    <ul className="navbar">
      <a className="navbar-brand" href="/">
        <img className="logo" src={logo} alt="Logo" width="70px" height="70px" />
      </a>

       {/* My Posts */}
     {isAuthenticated() && (
      <li className="nav-item">
        <Link className="nav-link left-link" to={`/my/posts/${_id}`}>
          My Posts
        </Link>
      </li>
    )}
    {/* CREATE A POST */}
    {isAuthenticated() && (
      <li className="nav-item">
        <Link className="nav-link left-link" to={`/new-post/${_id}`}>
          Write a post
        </Link>
      </li>
    )}
    
      {/* SIGNIN / SIGNUP */}
      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link className="nav-link" to="/signin">
              Sign In
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
          </li>
        </Fragment>
      )}
        {/* ADMIN DASHBOARD */}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link className="nav-link left-link" to="/admin/dashboard">
              Dashboard
            </Link>
          </li>
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
            Sign Out
          </span>
        </li>
      )}
    
    </ul>
  );
          }

export default withRouter(Navbar);
