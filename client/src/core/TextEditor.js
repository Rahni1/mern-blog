import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

import BlockStyleToolbar, {
  getBlockStyle,
} from "./blockStyles/BlockStyleToolbar";
import addLinkPlugin from "plugins/addLinkPlugin";

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.plugins = [addLinkPlugin];
  }
  toggleBlockType = (blockType) => {
    this.props.onChange(
      RichUtils.toggleBlockType(this.props.editorState, blockType)
    );
  };
  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(
      this.props.editorState,
      command
    );
    if (newState) {
      this.props.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  onUnderlineClick = () => {
    this.props.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, "UNDERLINE")
    );
  };

  onBoldClick = (event) => {
    this.props.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, "BOLD")
    );
  };

  onItalicClick = () => {
    this.props.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, "ITALIC")
    );
  };

  onAddLink = () => {
    const editorState = this.props.editorState;
    const selection = editorState.getSelection();
    const link = window.prompt("Paste the link -");
    if (!link) {
      this.props.onChange(RichUtils.toggleLink(editorState, selection, null));
      return "handled";
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
      url: link,
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      "create-entity"
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    this.props.onChange(
      RichUtils.toggleLink(newEditorState, selection, entityKey)
    );
  };

  toggleBlockType = (blockType) => {
    this.props.onChange(
      RichUtils.toggleBlockType(this.props.editorState, blockType)
    );
  };

  render() {
    return (
      <div className="editorContainer">
        <div className="toolbar">
          <BlockStyleToolbar
            editorState={this.props.editorState}
            onToggle={this.toggleBlockType}
          />
          <span className="row2">
            <button
              type="button"
              className="format-btn"
              onClick={this.onUnderlineClick}>
              U
            </button>
            <button
              type="button"
              className="format-btn"
              onClick={this.onBoldClick}>
              <b>B</b>
            </button>

            <button
              type="button"
              className="format-btn"
              onClick={this.onItalicClick}>
              <em>I</em>
            </button>

            <i
              onClick={this.onAddLink}
              className="format-btn material-icons md-18">
              attach_file
            </i>
          </span>
        </div>

        <div>
          <Editor
            blockStyleFn={getBlockStyle}
            editorState={this.props.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.props.onChange}
            plugins={this.plugins}
            placeholder="Write your content here..."
          />
        </div>
      </div>
    );
  }
}

export default TextEditor;
