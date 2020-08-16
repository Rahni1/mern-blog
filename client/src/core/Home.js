import React from 'react'
import Navbar from './Navbar'
import {Link} from 'react-router-dom'
import ListPosts from '../core/ListPosts';
import { isAuthenticated } from '../auth';

const Home = ({props, user}) => {
return (
        <div>
        <Navbar />
        <ListPosts />
    </div>
    )
}

export default Home
