import React from 'react'

import Navbar from './Navbar'
import ListPosts from '../core/ListPosts';

const Home = ({props, user}) => {
return (
        <div>
        <Navbar />
        <ListPosts />
    </div>
    )
}

export default Home
