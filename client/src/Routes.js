import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import AdminRoute from "./auth/AdminRoute";
import PrivateRoute from "./auth/PrivateRoute";
import Home from './core/Home'
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Blog from './core/Blog'
import ListPosts from "./core/ListPosts";
import AdminDashboard from "./user/AdminDashboard";
import CreatePost from "./core/CreatePost";
import UpdatePost from "./core/UpdatePost";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/blog" exact component={ListPosts} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
      
//         <PrivateRoute exact path="/blog" component={Blog} />

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
