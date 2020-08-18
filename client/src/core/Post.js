import React, { useState, useEffect } from "react";
import { read } from "./apiCore";
import Navbar from './Navbar';
import { deletePost } from '../user/apiUser';
import { isAuthenticated } from "../auth";
import {Link} from 'react-router-dom'
import UserDashboard from "../user/UserDashboard";
import Moment from 'react-moment';


const Post = props => {
  const [post, setPost] = useState({});
  const [error, setError] = useState(false);
const id = props.match.params.id

const {user, token} = isAuthenticated()
const {user: {_id}} = isAuthenticated()


  const loadSinglePost = id => {
    read(id).then(data => {
      if (error) {
        console.log(data.error)
        setError(data.error);       
      } else {
        setPost(data);
        console.log(data)
      }
    });
  };


  useEffect(() => {
    loadSinglePost(id);
  }, [props]);

  
  return (
    <div>
    <Navbar />
        <div className="post-container">
         <h3 className="post-title">{post && post.title}</h3>
         <div className="author-date">
         <p className="post-author">{post && post.author ? post.author.name : ""}</p> 
         <p className="post-date"><Moment className="post-date" format="D MMM YYYY">{post && post.date}</Moment></p></div>
         <p className="post-body">{post && post.body}</p>
        </div>
        </div>
  )
}


export default Post

// import React, { useState, useEffect } from "react";
// import { read } from "./apiCore";
// import Navbar from './Navbar';

// const Post = props => {
// const [values, setValues] = ({
//   title: "",
//   body: "",
//   error: ""
// })

// const {
//   title,
//   body,
//   error
// } = values;

//   const loadSinglePost = id => {
//     read(id).then(data => {
//       if (error) {
//         setValues({...values, error: data.error})      
//       } else {
//         setValues({...values,
//           title: data.title,
//          body: data.body
//      })
//       }
//     });
//   };

//   useEffect(() => {
//     const id = props.match.params.id;
//     loadSinglePost(id);
//   }, [props]);

  
//   return (
//     <div>
//     <Navbar />
//         <div className="post-container">
//          <h3 className="post-title">{title}</h3>
      
//          <p className="post-body">{ body}</p>
       
//         </div>
//         </div>
//   )
// }


// export default Post

