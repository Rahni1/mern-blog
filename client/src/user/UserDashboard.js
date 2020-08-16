import React, { Component } from 'react'
import PostsByUser from './postsByUser'
import Navbar from '../core/Navbar'
import { isAuthenticated } from '../auth'

 const UserDashboard = () => {
     return (
            <div>
            <Navbar />
               User Dashboard
                <PostsByUser />
            </div>
        )
 }

export default UserDashboard