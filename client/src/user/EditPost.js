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
        console.log(data, post)
        // console.log({title, body})
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

// import React from "react";
// import { isAuthenticated } from "../auth";
// import {API} from '../config'

// class EditPost extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//          title: '',
//          body: ''
//     }
// } 
// changeHandler = (e) => {
//   this.setState({ [e.target.name]: e.target.value })
// }

// submitHandler = (e, {match}) => {
//   e.preventDefault()
//   const {
//       user: { _id, token },
//     } = isAuthenticated();
//     const id = match.params.id
//   fetch(`${API}/${_id}/${id}/edit`, {
//     method: 'PUT',
//     headers: {
//     Accept: 'application/json',
//     Authorization: `Bearer ${token}`
// },
// body: JSON.stringify({
//   title: e.target.title.value,
//   body: e.target.body.value,
// })
//   .then(response => {
//       console.log(response)
//   }).catch(error => {
//       console.log(error)
//   })
// })
// }

// render() {
//    const {title, body} = this.state
//   return (
//       <div>
//           <form onSubmit={this.submitHandler}>
//           <input type="text" name="title" 
//           onChange={this.changeHandler} value={title} />
//           <input type="text" name="body"
//           onChange={this.changeHandler} value={body}/>
//           <button type="submit">Submit</button>
//           </form>
//       </div>
//   )}
// }



// export default EditPost