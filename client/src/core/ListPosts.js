import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { API } from '../config'

class ListPosts extends React.Component {
    state = {
        title: '',
        body: '',
        date: '',
        author: '',
        posts: []
    }

    componentDidMount = () => {
        this.getPost()
    }

// fetch posts using axios
    getPost = () => {
        axios.get(`${API}/blog`)
        .then((response) => {
            const data = response.data
            this.setState({posts: data})
            console.log('Data has been recieved')
        })
        .catch(() => {
            console.log('Error retrieving data')
        })
    }
     

    displayPost = (posts) => {
// var hasValueLessThanTen = false;
// for (var i = 0; i < myArray.length; i++) {
//     if (myArray[i] < 10) {
//       hasValueLessThanTen = true;
//       break;
//     }
//   }
        if (!posts.length) return null;
        return posts.map((post, index) => (
            <Link  className="card" to={`/blog/post/${post._id}`}>
            <div key={index}>
            <h3 className="posts-title">{post.title}</h3>
            <p className="posts-body">{post.body}</p>
            <p>{post.date}</p>
            <p>{post.author}</p>
            </div>
            </Link>
        ))
    }


    render() {
        return (
         <div className="grid">
           {this.displayPost(this.state.posts)}
           </div>
        )
    }

}

export default ListPosts

