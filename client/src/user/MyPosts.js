import React from 'react'
import {API} from '../config'
import { isAuthenticated } from "../auth";

class MyPosts extends React.Component {
    state = {
        title: '',
        body: '',
        posts: []
    }
  

    componentDidMount = () => {
        this.getPost()
    }
// fetch posts using axios
    getPost = (userId, token) => {
        fetch(`${API}/myblog/${userId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    return response.json();
                })
                .catch(err => console.log(err));
        };
 
     

    displayPost = (posts) => {

        if (!posts.length) return null;
        return posts.map((post, index) => (
            <div key={index}>
            <h3 className="posts-title">{post.title}</h3>
            <p>{post.body}</p>
            <p>{post.date}</p>
            <p>{post.author}</p>
            </div>
        ))
    }


    render() {
        return (
         <div>
         <h1>Posts </h1>
           {this.displayPost(this.state.posts)}
           </div>
        )
    }

}

export default MyPosts

