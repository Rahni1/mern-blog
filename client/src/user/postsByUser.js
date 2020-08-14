import React, {useEffect, useState} from 'react'
import { isAuthenticated } from "../auth";
import { postsByUser } from './apiUser';
import {Link} from 'react-router-dom'



const PostsByUser = ({history, match}) => {
  const [posts, setPosts] = useState([]);
    const {
        user: { _id },
      } = isAuthenticated();
      const token = isAuthenticated().token;

      const init = (userId, token) => {
    postsByUser(userId, token).then((data) => {  
      const posts = data.posts
       setPosts(posts)
      })
      };

      useEffect(() => {
        init(_id, token);
      }, []);

    //   const handleEdit = () => {
    //     history.push(`/${_id}/${post._id}/edit`);
    //  };

   
      const displayPosts = (posts) => {
        if (!posts.length) return null;
                return posts.map((post) => (
                  <div>
                  <Link  className="card" to={`/blog/post/${post._id}`}>                 
                 <h2>{post.title}</h2>
                 <h5>{post.body}</h5>
                 <p>{post.date}</p>   
                 </Link>
                 <Link to={`/${_id}/${post._id}/edit`}>Edit</Link>
                 </div>
                 ))
            }
        
                return (
                 <div>              
                  {displayPosts(posts)}
                 
                   </div>
                )
            }
        

export default PostsByUser