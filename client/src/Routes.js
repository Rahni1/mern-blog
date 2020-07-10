import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Posts from "./core/Posts";
import AdminDashboard from "./user/AdminDashboard";
import Post from "./core/Post";
import CreatePost from "./core/CreatePost";
import UpdatePost from "./core/UpdatePost";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

// <Route path="/signin" exact component={Signin} />
//         <Route path="/signup" exact component={Signup} />
//         <Route path="/articles" exact component={Posts} />
//         <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
//         <Route path="/blog/post/:id" exact component={Post} />
// <PrivateRoute
// exact
// path="/blog/post/create"
// exact
// component={CreatePost}
// />
// <PrivateRoute
// exact
// path="/blog/post/update/:id"
// component={UpdatePost}
// />
