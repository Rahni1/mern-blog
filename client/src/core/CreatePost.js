import React, {useEffect} from "react";
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
      createdPost: "",
      error: ""
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
    const id = this.props.match.params.id
    axios({ url: `${API}/new-post/${_id}`, method: "POST", data: this.state })
      .then((response) => {
        this.setState({createdPost: this.state.title})
        return response
      })
      .catch((error) => {
        if (!this.state.title || !this.state.body) {
        this.setState({error: "Your post must have a title and a body."})
        }
        console.log(error)
      });
  };

 showSuccess = () => {
  const {createdPost} = this.state
  return (
    <div className="created-post"
      style={{ display: createdPost ? "" : "none" }}>
      <h2>{`${createdPost} has just been created!`}</h2>
    </div>
  ); 
 }
 showError = () => {
  const {error} = this.state
  
  return (
    <div className="post-error"
      style={{ display: error ? "" : "none" }}>
      <h2>{`${error}`}</h2>
    </div>
  ); 
 }

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
            {this.showSuccess()}
            {this.showError()}
          </form>
        </div>
      </>
    );
  }
}

export default CreatePost;
