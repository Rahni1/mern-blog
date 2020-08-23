import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { editPost} from "./apiUser";
import { read } from "../core/apiCore";

const EditPost = ({match}) => {
  const [values, setValues] = useState({
    title: "",
    body: "",
    error: "",
    post: {}
  });
  const { user, token } = isAuthenticated();
  const {
    title,
    body,
    error,
  } = values;
  const [post, setPost] = useState({});

  const init = (id) => { 
      read(id).then(data => {
if (data.error) {
    setValues({...values, error: data.error})
} else {
    // populate the state
    setValues({...values,
         title: data.title,
        body: data.body,
    })
    setPost(data)
    console.log(data)
     }
    })
}
  useEffect(() => {
    const id = match.params.id;
    init(id);
  }, []);

  // higher order function
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });

    editPost(match.params.userId, match.params.id, token, post).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          body: "",
          error: false,
        });
        setPost(data)
        console.log(data)
      }
    });
  };

  const newPostForm = () => (
    <form className="newpost_form" onSubmit={clickSubmit}>
      <div className="form-group">
        <input
          onChange={handleChange("title")} type="text"
          name="title"
          className="newpost_field newpost_title"
          value={title}
        />
      </div>

      <div className="form-group">
        <textarea
          onChange={handleChange("body")}
          className="newpost_field newpost_textarea"
          value={body} name="body"
        />
      </div>

      <button className="btn publish-post-btn" type="submit">Publish</button>
    </form>
  );
  const showError = () => (
    <div
      style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  return (
        <div className="newpost_container">  
          {showError()}
          {newPostForm()}
        </div>
  );
};

export default EditPost;