import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import BlockStyleToolbar, {
  getBlockStyle,
} from "./blockStyles/BlockStyleToolbar";
import addLinkPlugin from "../plugins/addLinkPlugin";

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.plugins = [addLinkPlugin];
  }
  toggleBlockType = (blockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  onBoldClick = (event) => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };

  onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };

  onAddLink = () => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    const link = window.prompt("Paste the link -");
    if (!link) {
      this.onChange(RichUtils.toggleLink(editorState, selection, null));
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
    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
  };

  toggleBlockType = (blockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  render() {
    return (
      <div className="editorContainer">
        <div className="toolbar">
          <BlockStyleToolbar
            editorState={this.state.editorState}
            onToggle={this.toggleBlockType}
          />
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
            className="format-btn mb-icon material-icons md-18">
            attach_file
          </i>
        </div>

        <div className="editors">
          <Editor
            blockStyleFn={getBlockStyle}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            plugins={this.plugins}
          />
        </div>
      </div>
    );
  }
}

export default TextEditor;
