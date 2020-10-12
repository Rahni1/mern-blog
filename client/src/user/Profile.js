import React, { Component } from 'react'
import PostsByUser from './postsByUser'
import { isAuthenticated } from '../auth'
import Navbar from '../core/Navbar'

 const Profile = () => {
     const {user: {name, _id}} = isAuthenticated()
     return (
            <div>
            <Navbar />
            <h1 className="username">{name}</h1>
                <PostsByUser />
            </div>
        )
 }

export default Profile