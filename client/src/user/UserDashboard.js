import React, { Component } from 'react'
import PostsByUser from './postsByUser'
import { isAuthenticated } from '../auth'
import Navbar from '../core/Navbar'

 const UserDashboard = () => {
     return (
            <div>
            <Navbar />
                <PostsByUser />
            </div>
        )
 }

export default UserDashboard