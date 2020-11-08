import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
      error: "",
      bold: false,
      italized: false,
      underlined: false,
      subheading: false,
      link: false,
    };
    this.inputRef = React.createRef();
    this.outputRef = React.createRef();
    this.onBoldClick = this.onBoldClick.bind(this);
    this.onItalicsClick = this.onItalicsClick.bind(this);
    this.onUnderlineClick = this.onUnderlineClick.bind(this);
    this.onSubheadingClick = this.onSubheadingClick.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);
  }
  onBoldClick(event) {
    // checks whether turned on or off
    event.target.setAttribute("class", !this.state.bold ? "Selected" : "");
    // if on, add <strong> to output <div>
    if (!this.state.bold) {
      this.outputRef.current.innerHTML += "<strong></strong>";
    }
    this.setState({
      bold: !this.state.bold,
    });
    this.inputRef.current.focus();
  }
  onItalicsClick(event) {
    event.target.setAttribute("class", !this.state.italized ? "Selected" : "");

    if (!this.state.italized) {
      this.outputRef.current.innerHTML += "<em></em>";
    }
    this.setState({
      italized: !this.state.italized,
    });
    this.inputRef.current.focus();
  }
  onUnderlineClick(event) {
    event.target.setAttribute(
      "class",
      !this.state.underlined ? "Selected" : ""
    );
    if (!this.state.underlined) {
      this.outputRef.current.innerHTML += "<u></u>";
    }
    this.setState({
      underlined: !this.state.underlined,
    });
    this.inputRef.current.focus();
  }
  onSubheadingClick(event) {
    event.target.setAttribute(
      "class",
      !this.state.subheading ? "Selected" : ""
    );
    if (!this.state.subheading) {
      this.outputRef.current.innerHTML += "<h3></h3>";
    }
    this.setState({
      subheading: !this.state.subheading,
    });
    this.inputRef.current.focus();
  }
  onLinkClick(event) {
    event.target.setAttribute(
      "class",
      !this.state.link ? "Selected" : ""
    );
    if (!this.state.link) {
      this.outputRef.current.innerHTML += "<a></a>";
    }
    this.setState({
      link: !this.state.link,
    });
    this.inputRef.current.focus();
  }
  
  formatText(text) {
    switch (true) {
      case this.state.bold:
        const allBold = this.outputRef.current.getElementsByTagName("strong");
        const lastBold = allBold[allBold.length - 1];
        lastBold.innerText += text;
        break;
      case this.state.italized:
        const allItalized = this.outputRef.current.getElementsByTagName("em");
        const lastItalized = allItalized[allItalized.length - 1];
        lastItalized.innerText += text;
        break;
      case this.state.underlined:
        const allUnderlined = this.outputRef.current.getElementsByTagName("u");
        const lastUnderlined = allUnderlined[allUnderlined.length - 1];
        lastUnderlined.innerText += text;
        break;
          case this.state.subheading:
            const allSubheading = this.outputRef.current.getElementsByTagName("h3");
            const lastSubheading = allSubheading[allSubheading.length - 1];
            lastSubheading.innerText += text;
            break;
            case this.state.link:
            const allLink = this.outputRef.current.getElementsByTagName("a");
            const lastLink = allLink[allLink.length - 1];
            lastLink.innerText += text;
            break;
      default:
        this.outputRef.current.innerHTML += text;
        break;
    }
  }
  // handles if user deletes or replaces part of the text
  transferText() {
    const input = this.inputRef.current.value;
    const output = this.outputRef.current.innerHTML;
    let inputCounter = input.length - 1,
      outputCounter = output.length - 1,
      isTag = false;
    while (outputCounter > -1) {
      // If the current character is '>', then we are in a HTML tag. Skip until we get to '<'.
      if (output[outputCounter] === ">") {
        isTag = true;
        outputCounter -= 1;
        continue;
      }
      if (isTag) {
        isTag = output[outputCounter] !== "<";
        outputCounter -= 1;
        continue;
      }
      // If inputCounter <= -1, there's no more text to add to output, so break.
      if (inputCounter <= -1) {
        this.outputRef.current.innerHTML = this.outputRef.current.innerHTML.slice(
          outputCounter + 1
        );
        break;
      }
      // Else, replace text in output with the corresponding text in the text area.
      else {
        let temp = this.outputRef.current.innerHTML;
        temp =
          temp.slice(0, outputCounter) +
          input[inputCounter] +
          temp.slice(outputCounter + 1);
        this.outputRef.current.innerHTML = temp;
        inputCounter -= 1;
        outputCounter -= 1;
      }
    }
  }
  changeHandler = (e) => {
    const input = this.inputRef.current.value;
    const output = this.outputRef.current.innerText;
    if (input.length > output.length) {
      const newText = input.slice(output.length);
      this.formatText(newText);
    } else {
      this.transferText();
    }
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
      data: this.state,
    })
      .then((response) => {
        this.setState({ createdPost: this.state.title });
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
 
  render() {
    const { title, body } = this.state;
    return (
      <>
        <Navbar />
        <Tabs>
    <TabList>
      <Tab>Default</Tab>
      <Tab>Preview</Tab>
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
            <span className="formatting-box">
              <button
                className="format-btn"
                type="button"
                onClick={this.onBoldClick}>
                <strong>B</strong>
              </button>
              <button
                className="format-btn"
                type="button"
                onClick={this.onItalicsClick}>
                <em>I</em>
              </button>
              <button
                className="format-btn"
                type="button"
                onClick={this.onUnderlineClick}>
                <u>U</u>
              </button>
              <button
                className="format-btn"
                type="button"
                onClick={this.onSubheadingClick}>
                <h3>H3</h3>
              </button>
              <button
                className="format-btn"
                type="button"
                onClick={this.onLinkClick}>
                <a>Link</a>
              </button>
            </span>
            <div className="form-group">
              <textarea
                ref={this.inputRef}
                placeholder="Post Content"
                name="body"
                className="newpost_field newpost_textarea Text"
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
          </TabPanel>

          <TabPanel>
          <div>
          <h1>Preview</h1>
          <h1>{title}</h1>
          <div ref={this.outputRef}></div>
        </div>
        </TabPanel>
        </Tabs>
      </>
    );
  }
}

export default CreatePost;