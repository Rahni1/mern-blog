import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import AdminRoute from "./auth/AdminRoute";
import PrivateRoute from "./auth/PrivateRoute";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import EditPost from './user/EditPost'
import Post from "./core/Post";
import AdminDashboard from "./user/AdminDashboard";
import CreatePost from "./core/CreatePost";
import postsByUser from './user/postsByUser'
import Profile from "./user/Profile";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/post/" exact component={Home} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/signin" exact component={Signin} />
      <PrivateRoute path="/post/new-post/:userId" exact component={CreatePost} />
      <Route path="/post/:slug/:id" exact component={Post} />
      <Route path="/user/my/posts/:userId" exact component={postsByUser} />
      <PrivateRoute exact path="/post/:userId/:id/edit" component={EditPost} />
      <PrivateRoute path="/dashboard" exact component={Profile} />
      <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
