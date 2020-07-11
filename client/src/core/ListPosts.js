import React from 'react'
import axios from 'axios'

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
            <div key={index}>
            <h3 className="post-title">{post.title}</h3>
            <p>{post.body}</p>
            <p>{post.date}</p>
            <p>{post.author}</p>
            </div>
        ))
    }


    render() {
        return (
         <div>
           {this.displayPost(this.state.posts)}
           </div>
        )
    }

}

export default ListPosts

