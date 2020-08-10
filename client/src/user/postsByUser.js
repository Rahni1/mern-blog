import React, {useEffect, useState} from 'react'
import { isAuthenticated } from "../auth";
import { postsByUser } from './apiUser';
     
const PostsByUser = () => {
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


   
      const displayPosts = (posts) => {
        if (!posts.length) return null;
                return posts.map((post) => (
                  <div>
                 <h2>{post.title}</h2>
                 <h5>{post.body}</h5>
                 <p>{post.date}</p>
                 <p>{post.author.name}</p>
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