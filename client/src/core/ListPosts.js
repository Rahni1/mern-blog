import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { API } from '../config'
import Moment from 'react-moment';


class ListPosts extends React.Component {
    state = {
        title: '',
        body: '',
        date: '',
        posts: []
    }

    componentDidMount = () => {
        this.getPost()
    }

// fetch posts using axios
    getPost = () => {
        axios.get(`${API}`)
        .then((response) => {
            const data = response.data
            this.setState({posts: data})
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
            <Link  className="card" to={`/post/${post._id}`}>
            <div key={index}>
            <h3 className="posts-title">{post.title}</h3>
            <p className="posts-body">{post && post.body && post.body.substring(0, 30)}...</p>
            <p className="post-author list-author">{post && post.author ? post.author.name : ""}</p> 
             <Moment className="post-date list-date" format="D MMM YYYY">{post.date}</Moment>
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

