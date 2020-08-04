import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { createPost } from "./apiCore";
import Navbar from './Navbar'
import imagesIcon from '../img/image.png'

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

  const init = () => {
        setValues({ ...values, formData: new FormData() });
  }

  useEffect(() => {
    init();
  }, []);


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
    <form className="newpost_form" onSubmit={clickSubmit}>
     <div class="image-upload">
  <label for="file-input">
  <div className="tooltip">
    <img className="img-upload-icon" src={imagesIcon} width="30px" height="30px" />
  <span class="tooltiptext">Add an image</span>
</div>
  </label>

<input id="file-input" 
  onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*" />
</div>

      <div className="form-group">
        <input
          onChange={handleChange("title")}
          type="text"
          placeholder="Title"
          className="newpost_field newpost_title"
          value={title}
        />
      </div>

      <div className="form-group">
        <textarea
          onChange={handleChange("body")}
          className="newpost_field newpost_textarea"
          value={body}
          placeholder="Post Content"
        />
      </div>

      <button className="btn publish-post-btn">Publish</button>
    </form>
  );
  const showError = () => (
    <div
      className="create-post-error"
      style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="create-post-success"
      style={{ display: createdPost ? "" : "none" }}>
      <h2>{`${createdPost} is created!`}</h2>
    </div>
  );

 

  return (
    <>
    <Navbar />
      <div className="newpost_container">
        <div className="col-md-8 offset-md-2">
          {newPostForm()}
          {showSuccess()}
          {showError()}
        </div>
      </div>
      </>
  );
};

export default CreatePost;