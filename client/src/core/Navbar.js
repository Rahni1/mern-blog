import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { signout, isAuthenticated } from "../auth";
import logo from "../img/logo.png";
import WritePostLink from "../user/WritePostLink";


const Navbar = ({ history, match }) => {
  const [openNavbar, setOpenNavbar] = useState(false)
  return (
    <ul className="navbar">
    <li>
      <a className="navbar-brand" href="/posts/">
        <img
          className="logo"
          src={logo}
          alt="Logo"
          width="70px"
          height="70px"
        />
      </a>
      </li>

     
<span className="menu-icon" 
onClick={() => setOpenNavbar(!openNavbar)}>
      <FontAwesomeIcon size="lg" icon={faBars} />
      </span>
      {<div className={`nav-links ${openNavbar ? 'open' : ''}`}>
    {isAuthenticated() && (
        <li className="nav-item">
          <Link className="nav-link left-link" to={`/dashboard`}>
            Dashboard
          </Link>
        </li>
      )} 
   
      {/* CREATE A POST */}
      {isAuthenticated() && (
        <li className="nav-item">
          <WritePostLink />
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
                history.push("/post/");
              })
            }>
            Sign Out
          </span>
        </li>
           
      )}
      </div>
          }
    </ul>     
  )}
        
  export default withRouter(Navbar);
