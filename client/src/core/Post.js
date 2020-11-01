import React, { useState, useEffect } from "react";
import Moment from "react-moment";

import { read } from "./apiCore";
import Navbar from "./Navbar";
import { isAuthenticated } from "../auth";
import Diamond from "../img/diamond.png";
import { API } from "../config";

const Post = (props) => {
  const [post, setPost] = useState({});
  const [error, setError] = useState(false);
  const id = props.match.params.id;

  const loadSinglePost = (slug, id) => {
    read(slug, id).then((data) => {
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
    const slug = props.match.params.slug;
    loadSinglePost(slug, id);
  }, [props]);

  const diamond = (id) => {
    const { token } = isAuthenticated();
    const {
      user: { _id },
    } = isAuthenticated();
    fetch(`${API}/post/diamond/${_id}/${id}`, {
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
        const {
          user: { _id },
        } = isAuthenticated();
        let updatedPost = { ...post };
        updatedPost.diamonds.push(_id);
        setPost(updatedPost);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showDiamondIcon = () => {
    const { user } = isAuthenticated();
    return (
      <span className="diamond">
        {/* if user is not signed in or if it's their own post, hide like icon */}
        {!user || (post.author && post.author.id === user._id) ? (
          ""
        ) : (
          <img
            className="add-diamond"
            src={Diamond}
            onClick={() => {
              diamond(id);
            }}
            width="22px"
            height="22px"
            alt="Diamond icon"
          />
        )}
      </span>
    );
  };

  return (
    <>
      <Navbar />
      <div className="post-container">
        <h3 className="post-title">{post.title}</h3>
        <div className="author-date">
          <p className="post-author">{post.author ? post.author.name : ""}</p>
          <p className="post-date">
            <Moment className="post-date" format="D MMM YYYY">
              {post.date}
            </Moment>
          </p>
        </div>
        <p className="post-body">{post.body}</p>

        <div className="diamonds">
          {showDiamondIcon()}

          <p className="diamond-length">
            {post.diamonds && post.diamonds.length}{" "}
            {post.diamonds && post.diamonds.length === 1
              ? "Diamond"
              : "Diamonds"}{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Post;
