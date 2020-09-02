import React, {useState} from 'react'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'

const WritePostLink = (props) => {
    const {user: {_id}} = isAuthenticated()
 
    return (
        <div>
<Link className="nav-link left-link" to={`/new-post/${_id}`}>Write Post</Link>
</div>
    )
}

export default WritePostLink