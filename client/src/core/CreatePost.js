import React from "react";
import axios from "axios";
import { API } from "../config";
import { isAuthenticated } from "../auth";
import Navbar from "./Navbar";

class CreatePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      success: false,
    };
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const {
      user: { _id },
    } = isAuthenticated();
    axios({ url: `${API}/new-post/${_id}`, method: "POST", data: this.state })
      .then((response) => {
        return response 
        // && this.setState({ success: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // showSuccess = (success) => {
  //   const {success} = this.state(
  //   <div style={{ display: success ? "" : "none" }}>New post is created.</div>
  // );
  //   }

  render() {
    const { title, body } = this.state;
    return (
      <>
        <Navbar />
        <div className="newpost_container">
          <form className="newpost_form" onSubmit={this.submitHandler}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Title"
                name="title"
                className="newpost_field newpost_title"
                onChange={this.changeHandler}
                value={title}
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Post Content"
                name="body"
                className="newpost_field newpost_textarea"
                onChange={this.changeHandler}
                value={body}
              />
            </div>
            <button className="btn publish-post-btn" type="submit">
              Publish
            </button>
          </form>
        </div>
      </>
    );
  }
}
export default CreatePost;
