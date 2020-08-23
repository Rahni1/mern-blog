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

  const diamond = (id) => {
    const {
      user: { _id },
      token,
    } = isAuthenticated();
    fetch(`${API}/diamond/${_id}/${id}`, {
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
        const {user: {_id}} = isAuthenticated()
        let updatedPost = { ...post };
      if (_id === post.author.id || post.diamonds && post.diamonds.includes(_id)){
       return null
      } else {
        updatedPost.diamonds.push(id);
        setPost(updatedPost);
      }})
      .catch((err) => {
        console.log(err);
      });
  };
// const showDiamondIcon = () => {
//   const {user: {_id}} = isAuthenticated()
//   return (
//     <div>
//   {post.author && post.author.id === _id || post.diamonds && post.diamonds.includes(_id) ? "" :
//       <img
//       className="add-diamond"
//       src={Diamond}
//       onClick={() => {
//         diamond(id);
//       }}
//       width="5%"
//       height="5%"
//       alt="Diamond icon"
//     />}
//     </div>
//   )
//   }
 
  const {user: {_id}} = isAuthenticated()
  return (
    <div>
      <Navbar />
      <div className="post-container">
      <h3 className="post-title">{post.title}</h3>
      <div className="author-date">
        <p className="post-author">
          {post.author ? post.author.name : ""}
        </p>
        <p className="post-date">
          <Moment className="post-date" format="D MMM YYYY">
            {post.date}
          </Moment>
        </p>
      </div>
      <p className="post-body">{post.body}</p>
    <div className="diamonds">
      <h5 className="diamonds-length">
        {post.diamonds && post.diamonds.length}{" "}
        {post.diamonds && post.diamonds.length === 1
          ? "diamond"
          : "diamonds"}{" "}
      </h5>
    </div>
      <div>
    {post.author && post.author.id === _id || post.diamonds && post.diamonds.includes(_id) ? "" :
        <img
        className="add-diamond"
        src={Diamond}
        onClick={() => {
          diamond(id);
        }}
        width="5%"
        height="5%"
        alt="Diamond icon"
      />}
      </div>
    </div>
    </div>
  );
};

export default Post;