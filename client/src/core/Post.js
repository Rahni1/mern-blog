import React, { useState, useEffect } from "react";
import { read } from "./apiCore";

const Post = props => {
  const [post, setPost] = useState({});
  const [error, setError] = useState(false);

  const loadSinglePost = id => {
    read(id).then(data => {
      if (data.error) {
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
         <h3>{post && post.title}</h3>
         <p>{post && post.body}</p>
         <p>{post && post.date}</p>
        </div>
  )
}


export default Post
