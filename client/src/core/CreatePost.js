import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { createPost } from "./apiCore";

const CreatePost = () => {
  const [values, setValues] = useState({
    title: "",
    body: "",
    photo: "",
    error: "",
    createdPost: "",
    formData: "",
  });
  const { user, token } = isAuthenticated();
  const {
    title,
    body,
    error,
    createdPost,
    formData,
  } = values;

  // higher order function
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value, formData: new FormData() });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });

    createPost(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          body: "",
          photo: "",
          createdPost: data.title,
        });
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          onChange={handleChange("title")}
          type="text"
          className="form-control"
          value={title}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Post body</label>
        <textarea
          onChange={handleChange("body")}
          className="form-control"
          value={body}
        />
      </div>

      <button className="btn btn-dashboard btn-outline-primary">Create Post</button>
    </form>
  );
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdPost ? "" : "none" }}>
      <h2>{`${createdPost} is created!`}</h2>
    </div>
  );

 

  return (
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newPostForm()}
        </div>
      </div>
  );
};

export default CreatePost;