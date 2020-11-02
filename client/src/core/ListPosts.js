import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { API } from "../config";

class ListPosts extends React.Component {
  state = {
    title: "",
    body: "",
    date: "",
    posts: [],
  };

  componentDidMount = () => {
    this.getPosts();
  };

  getPosts = () => {
    axios
      .get(`${API}/post`)
      .then((response) => {
        const posts = response.data;
        this.setState({ posts });
        console.log(posts)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  displayPosts = (posts) => {
    if (!posts.length) return null;
     return posts.map((post, index) => (
      <Link className="card" to={`/post/${post.slug}/${post._id}`}>
        <div key={index}>
          <h3 className="posts-title">{post.title}</h3>
          <p className="posts-body">
            {post && post.body && post.body.substring(0, 50)}...
          </p>
          <span className="author-date">
            <p className="post-author">
              {post && post.author ? post.author.name : ""}
            </p>
            <p className="post-date">
              <Moment className="post-date" format="D MMM YYYY">
                {post.date}
              </Moment>
            </p>
          </span>
        </div>
      </Link>
    ));
  };

  render() {
    return <div className="grid">{this.displayPosts(this.state.posts)}</div>;
  }
}

export default ListPosts;
