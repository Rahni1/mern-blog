import React, { useState, useEffect } from "react";
import { read } from "./apiCore";
import Navbar from './Navbar';

const Post = props => {
  const [post, setPost] = useState({});
  const [error, setError] = useState(false);


  // console.log(post)

  const loadSinglePost = id => {
    read(id).then(data => {
      if (error) {
        console.log(error)
        setError(error);       
      } else {
        setPost(data);
      }
    });
  };

  useEffect(() => {
    const id = props.match.params.id;
    loadSinglePost(id);
  }, [props]);

  
  return (
    <div>
    <Navbar />
        <div className="post-container">
         <h3 className="post-title">{post && post.title}</h3>
         <p className="post-date">{post && post.date}</p>
         <p className="post-body">{post && post.body}</p>
         <p> {post.author ? post.author.name : ""}</p>
        </div>
        </div>
  )
}


export default Post

