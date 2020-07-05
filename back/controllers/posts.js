const Post = require('../models/Post')
const apssport = require('passport')
const validatePostInput = require('../validation/post')
const router = require('../routes/posts')
const passport = require('passport')
// private/authenticated route
exports.getPosts = 
// passport middleware authenticates user 
// returns a user object (null, user) on successful authentication
passport.authenticate("jwt", { session: false }),
(req, res) => {
    // req contains the user object which is used to get user_name
    // populate all posts posted by a certain user and return them
Post.find({ author: req.user.user_name })
.then(posts => res.status(200).json(posts))
.catch(err => {
    res.status(400).json({
        user: "Error fetching posts from signed in user."
    })
})
}

// public routes
// fetches posts by id
exports.getPostById = (req, res) => {
    Post.find({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(err => res.status(400).json({ id: "Error fetching post by id"}))
}

// fetches posts by author
exports.getPostByAuthor = (req, res) => {
    Post.find({ author: req.params.author })
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(400).json({
        author: "Error fetching posts from specific author"
    }))
}