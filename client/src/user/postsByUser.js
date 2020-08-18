import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth";
import { postsByUser } from "./apiUser";
import { Link } from "react-router-dom";
import { deletePost } from "../user/apiUser";

const PostsByUser = ({ history, match }) => {
  const [posts, setPosts] = useState([]);

  const {
    user: { _id },
  } = isAuthenticated();
  const token = isAuthenticated().token;

  const init = (userId, token) => {
    postsByUser(userId, token).then((data) => {
      const posts = data.posts;
      setPosts(posts);
    });
  };

  const destroy = (id) => {
    deletePost(id, _id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        init(_id, token);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const displayPosts = (posts) => {
    if (!posts.length) return null;
    return posts.map((post) => (
      <div className="mypost">
        <Link className="card" to={`/post/${post._id}`}>
          <h2 className="mypost_title">{post.title}</h2>
        </Link>

        {post && isAuthenticated() ? (
          <span
            className="mypost_btn delete_btn"
            onClick={() => destroy(post._id) && this.open}>
            Delete
          </span>
        ) : (
          ""
        )}
        <Link className="mypost_btn edit_btn" to={`/${_id}/${post._id}/edit`}>
          Edit
        </Link>

        <hr className="hr" />
      </div>
    ));
  };

  return <div>{displayPosts(posts)}</div>;
};

export default PostsByUser;
