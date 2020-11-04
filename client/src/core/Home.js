import React from 'react'

import Navbar from './Navbar'
import ListPosts from '../core/ListPosts';

const Home = ({props, user}) => {
return (
        <div>
        <Navbar />
        <div className="background">
        <div className="about-app">
        <h5><span>Shiny Syntax</span> is a blogging platform for developers and all those who enjoy tech to share & learn about new concepts,
         the latest technologies and writing shiny code. It's for everyone who's interested in tech but
         our aim is to provide somewhere where juniors can learn as well as share their knowledge 
         where they're supported and encouraged to grow. 
         Be a <span>diamond</span> and get blogging!💎
         </h5>
        </div>
        </div>
        <ListPosts />
    </div>
    )
}

export default Home
