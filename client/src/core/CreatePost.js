import React from 'react'
import axios from 'axios'
import {API} from '../config'

 class CreatePost extends React.Component {
     constructor(props) {
         super(props)
     
         this.state = {
              title: '',
              body: ''
         }
     }
     
     changeHandler = (e) => {
         this.setState({ [e.target.name]: e.target.value })
     }
     

     submitHandler = e => {
         e.preventDefault()
         axios.post(`${API}/blog/post`, this.state)
    // axios({ url: `${API}/blog/post`, method: 'POST', data: this.state})
         .then(response => {
             console.log(response)
         }).catch(error => {
             console.log(error)
         })
     }
    render() {
        const {title, body} = this.state
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                <input type="text" name="title" 
                onChange={this.changeHandler} value={title} />
                <input type="text" name="body"
                onChange={this.changeHandler} value={body}/>
                <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default CreatePost