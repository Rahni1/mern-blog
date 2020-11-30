import React from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const MarkdownCard = () => {
  const {
    user: { _id },
  } = isAuthenticated();
  return (
    <div className="markdown-card">
      <h3>Markdown</h3>
      <table>
        <tr>
          <td className="markdown-td"># Header</td>
          <td>H1 Header</td>
        </tr>
        <tr>
          <td className="markdown-td">###### Header</td>
          <td>H6 Header</td>
        </tr>
        <tr>
          <td className="markdown-td">*italics*</td>
          <td>
            <i>italics</i>
          </td>
        </tr>
        <tr>
          <td className="markdown-td">**bold**</td>
          <td>
            <strong>bold</strong>
          </td>
        </tr>
        <tr>
          <td className="markdown-td">[Link](https://...)</td>
          <td>
            <Link to={`/post/new-post/${_id}`}>Link</Link>
          </td>
        </tr>
        <tr>
          <td className="markdown-td">
            * item 1<br />* item 2
          </td>
          <td>
            <li>item 1</li>
            <li>item 2</li>
          </td>
        </tr>
        <tr>
          <td className="markdown-td">
            1. item 1 <br />
            2. item 2
          </td>
          <td>
            <ol className="one-line">
              <li>item 1</li>
              <li>item 2</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="markdown-td">
            `code`
          </td>
          <td>
            <code>the code</code>
          </td>
        </tr>
        <tr>
          <td className="markdown-td last-td">
            ___ <br /> 3 underscores on new line
          </td>
          <td className="last-td">
            <hr />
            horizontal line
          </td>
        </tr>
      </table>
    </div>
  );
};

export default MarkdownCard;
