import React, {useEffect} from 'react'
import {API} from '../config'
import { isAuthenticated } from "../auth";
import { postsByUser } from './apiUser';
     
const PostsByUser = () => {
    const {
        user: { _id },
      } = isAuthenticated();
      const token = isAuthenticated().token;

      const init = (userId, token) => {
    postsByUser(userId, token).then((data) => {
       console.log(data)
      })
      };
      useEffect(() => {
        init(_id, token);
      }, []);

    return <h1>Posts by a specific user</h1>
}

export default PostsByUser