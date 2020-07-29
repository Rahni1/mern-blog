import React, { useState, useEffect } from "react";
import { read } from "./apiCore";
import Navbar from './Navbar';

const Post = props => {
  const [post, setPost] = useState({});
  const [error, setError] = useState(false);

  const loadSinglePost = id => {
    read(id).then(data => {
      if (data.error) {
        console.log(data.error)
        setError(data.error);       
      } else {
        console.log(data)
        setPost(data);
      }
    });
  };

  useEffect(() => {
    const id = props.match.params.id;
    console.log(id)
    loadSinglePost(id);
  }, [props]);

  return (
    <div>
    <Navbar />
        <div className="post-container">
         <h3 className="post-title">{post && post.title}</h3>
         <p className="post-date">{post && post.date}</p>
         <p className="post-body">{post && post.body}</p>
        </div>
        </div>
  )
}


export default Post
