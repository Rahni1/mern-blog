import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { EditorState, convertToRaw } from "draft-js";
import axios from "axios";
import { stateToHTML } from "draft-js-export-html";

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
      url: `${API}/post/new-post/${_id}`,
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
  renderText = () => {
    const { body } = this.state;
        const {
      user: { _id },
    } = isAuthenticated();
    // const result = body.map(block => (
    // !block.text.trim() && '\n') || block.text
    // ).join('\n');
    // console.log(`result: ${result}`)
    //  const res = body.forEach(block => (
    //    !block.text.trim() && '\n') || block.text)
    //   console.log(res)
    for (var i = 0; i < body.length; i++) {
      return (
        <div> {body[i].text}</div>
        )
  };
  }

  showSuccess = () => {
    const { createdPost } = this.state;

    return (
      <div
        className="success-post"
        style={{ display: createdPost ? "" : "none" }}>
        <h2>{`Your post has been successfully published!`}</h2>
      </div>
    );
  };

  showError = () => {
    const { error } = this.state;

    return (
      <div className="post-error" style={{ display: error ? "" : "none" }}>
        <h2>{`${error}`}</h2>
      </div>
    );
  };

  getText = () => {
    return stateToHTML(this.state.body.getCurrentContent());
  };

  render() {
    const { title, body } = this.state;
    const {
      user: { _id },
    } = isAuthenticated();
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
            <div className="newpost_container preview">
              <h1>{title}</h1>
              <div dangerouslySetInnerHTML={{ __html: this.getText() }}></div>
            </div>
          </TabPanel>
        </Tabs>
      </>
    );
  }
}

export default CreatePost;
