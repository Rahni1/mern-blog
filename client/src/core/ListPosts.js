import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

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
        axios.get('http://localhost:8000/blog')
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
        if (!posts.length) return null;
        return posts.map((post, index) => (
            <Link  className="card" to={`/post/${post._id}`}>
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

