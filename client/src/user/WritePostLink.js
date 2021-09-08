import React from "react";
import { Link } from "react-router-dom";

import { isAuthenticated } from "../auth";

const WritePostLink = () => {
  const {
    user: { _id },
  } = isAuthenticated();

  return (
    <div>
      <Link className="nav-link left-link" to={`/post/new-post/${_id}`}>
        Write A Post
      </Link>
    </div>
  );
};

export default WritePostLink;
