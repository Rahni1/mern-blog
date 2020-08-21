import React, { useState, useEffect } from "react";
import { read } from "./apiCore";
import Navbar from "./Navbar";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import UserDashboard from "../user/UserDashboard";
import Moment from "react-moment";
import Diamond from "../img/diamond.png";
import { API } from "../config";

const Post = (props) => {
  const [post, setPost] = useState({});
  const [error, setError] = useState(false);
  const id = props.match.params.id;

  const loadSinglePost = (id) => {
    read(id).then((data) => {
      if (error) {
        console.log(data.error);
        setError(data.error);
      } else {
        setPost(data);
        console.log(data);
      }
    });
  };

  useEffect(() => {
    loadSinglePost(id);
  }, [props]);

  const like = (id) => {
    const {
      user: { _id },
      token,
    } = isAuthenticated();
    fetch(`${API}/like/${_id}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((result) => {
        let updatedPost = { ...post };
        updatedPost.likes.push(id);
        setPost(updatedPost);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Navbar />
      <div className="post-container">
        <h3 className="post-title">{post && post.title}</h3>
        <div className="author-date">
          <p className="post-author">
            {post && post.author ? post.author.name : ""}
          </p>
          <p className="post-date">
            <Moment className="post-date" format="D MMM YYYY">
              {post && post.date}
            </Moment>
          </p>
        </div>
        <p className="post-body">{post && post.body}</p>
      </div>
      <div className="likes">
        <h5 className="likes-length">
          {post && post.likes && post.likes.length}{" "}
          {post && post.likes && post.likes.length === 1
            ? "diamond"
            : "diamonds"}{" "}
        </h5>
        <img
          className="add-diamond"
          src={Diamond}
          onClick={() => {
            like(id);
          }}
          width="5%"
          height="5%"
          alt="Diamond icon"
        />
      </div>
    </div>
  );
};

export default Post;
