import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import AdminRoute from "./auth/AdminRoute";
import PrivateRoute from "./auth/PrivateRoute";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Blog from "./core/Blog";
import ListPosts from "./core/ListPosts";
import Post from "./core/Post";
import AdminDashboard from "./user/AdminDashboard";
import CreatePost from "./core/CreatePost";
import UpdatePost from "./core/UpdatePost";
import MyPosts from "./user/MyPosts";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
       <PrivateRoute path="/blog/post" exact component={CreatePost} />
       <Route path="/post/:id" exact component={Post} />
       <PrivateRoute path="/myblog" exact component={MyPosts} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

//         <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
// <PrivateRoute
// exact
// path="/blog/post/update/:id"
// component={UpdatePost}
// />
