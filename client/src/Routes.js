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
// import UpdatePost from "./core/UpdatePost";
import postsByUser from "./user/postsByUser";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/signin" exact component={Signin} />
      <PrivateRoute path="/new-post/:userId" exact component={CreatePost} />
      <Route path="/post/:id" exact component={Post} />

      <PrivateRoute exact path="/:userId/:id/edit" component={EditPost} />
      <PrivateRoute path="/my/posts/:userId" exact component={postsByUser} />
      <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
