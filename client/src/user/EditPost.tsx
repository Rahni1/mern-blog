import React, { useState, useEffect } from "react";

import { isAuthenticated } from "../auth";
import { editPost } from "./apiUser";
import { read } from "../core/apiCore";
import Navbar from '../core/Navbar'

const EditPost = ({ match } : { match: any }) => {
  const [values, setValues] = useState({
    title: "",
    body: "",
    error: "",
    updatedPost: "",
  });

  const [post, setPost] = useState({ title: values.title, body: values.body });
  const { token } = isAuthenticated();
  const { title, body, error, updatedPost } = values;

  const init = (slug: string, id: number) => {
    read(slug, id).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // populate the state
        setValues({ ...values, title: data.title, body: data.body });
        setPost({ title: values.title, body: values.body });
      }
    });
  };

  useEffect(() => {
    const id = match.params.id;
    const slug = match.params.slug
    init(slug, id);
  }, []);

  // updates post whenever values change
  useEffect(() => {
    setPost({ ...values });
  }, [values.title, values.body]);

  const handleChange = (name: string) => (event: any) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event: any) => {
    event.preventDefault();
    setValues({ ...values, error: "" });
    setPost({ title: values.title, body: values.body });

    editPost(match.params.userId, match.params.id, token, post).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: data.title,
          body: data.body,
          updatedPost: data.title,
          error: "",
        });

        console.log(post);
        console.log(data);
      }
    });
  };

  const newPostForm = () => (
    <form className="newpost_form" onSubmit={clickSubmit}>
      <div className="form-group">
        <input
          onChange={handleChange("title")}
          type="text"
          name="title"
          className="newpost_field newpost_title"
          value={title}
        />
      </div>

      <div className="form-group">
        <textarea
          onChange={handleChange("body")}
          className="newpost_field newpost_textarea"
          value={body}
          name="body"
        />
      </div>

      <button className="btn publish-post-btn" type="submit">
        Publish
      </button>
    </form>
  );

  const showSuccess = () => (
      <div className="success-post update-success"
        style={{ display: updatedPost ? "" : "none" }}>
        <h2>{`Your post has been successfully updated!`}</h2>
      </div>
    ); 

  const showError = () => (
    <div style={{ display: error ? "" : "none" }}>{error}</div>
  );

  return (
    <>
    <Navbar />
    <div className="newpost_container">
      {showError()}
      {newPostForm()}
      {showSuccess()}
    </div>
    </>
  );
};

export default EditPost;
