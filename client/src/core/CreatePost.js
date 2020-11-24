import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { EditorState, convertToRaw } from "draft-js";
import axios from "axios";
import { stateToHTML } from "draft-js-export-html";
import "draft-js/dist/Draft.css";
import { API } from "config";
import { isAuthenticated } from "auth";
import Navbar from "./Navbar";
import TextEditor from "./TextEditor";

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: EditorState.createEmpty(),
      createdPost: "",
      error: "",
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
    axios({
      url: `${API}/api/post/new-post/${_id}`,
      method: "POST",
      data: {
        ...this.state,
        body: JSON.stringify(convertToRaw(this.state.body.getCurrentContent())),
      },
    })
      .then((response) => {
        this.setState({ createdPost: this.state.title });
        //   this.state.body = EditorState.createWithContent(
        //     convertFromRaw(JSON.parse(this.state.body))
        //  );
        return response;
      })
      .catch((error) => {
        if (!this.state.title || !this.state.body) {
          this.setState({
            error: "This post must contain a title and a body.",
          });
        }
        console.log(error);
      });
  };

  showSuccess = () => {
    const { createdPost } = this.state;

    return (
      <div
        className="success-post"
        style={{ display: createdPost ? "" : "none" }}>
        <h2 className="success-post">{`Your post has been successfully published!`}</h2>
      </div>
    );
  };

  showError = () => {
    const { error } = this.state;

    return (
      <div className="post-error" style={{ display: error ? "" : "none" }}>
        <h2 className="post-error">{`${error}`}</h2>
      </div>
    );
  };

  getText = () => {
    return stateToHTML(this.state.body.getCurrentContent());
  };

  render() {
    const { title, body } = this.state;
    return (
      <>
        <Navbar />
        <Tabs>
          <TabList className="tabs">
            <Tab className="tab">Draft</Tab>
            <Tab className="tab">Preview</Tab>
          </TabList>
          <TabPanel>
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
                <div className="form-group newpost_body">
                  <TextEditor
                    onChange={(value) => this.setState({ body: value })}
                    editorState={body}
                  />
                </div>
                <button className="btn publish-post-btn" type="submit">
                  Publish
                </button>
                {this.showSuccess()}
                {this.showError()}
              </form>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="preview">
              <h1 className="newpost_title preview">{title}</h1>
              <div
                className="preview"
                dangerouslySetInnerHTML={{ __html: this.getText() }}></div>
            </div>
          </TabPanel>
        </Tabs>
      </>
    );
  }
}

export default CreatePost;
