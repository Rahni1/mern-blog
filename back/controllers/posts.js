const Post = require('../models/Post')
const apssport = require('passport')
const validatePostInput = require('../validation/post')
const router = require('../routes/posts')
const passport = require('passport')

// private/authenticated API
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

// create, delete & update are user-specific so will be private APIs

exports.create =
passport.authenticate("jwt", {session: false}),
(req, res) => {
    const author = req.user.user_name
    const post = req.body
    // check if user input is valid
    const { errors, isValid } = validatePostInput(post)
    if (!isValid) {
        res.status(400).json(errors)
    }
    post.author = author
    const newPost = new Post(post)
// save post to db
    newPost.save()
    .then(doc => res.json(doc))
    .catch(err => console.log({create: "Error creating new post."}))
}


exports.update = passport.authenticate("jwt", {session: false}),
(req, res) => {
    const author = req.user.user_name
    const {errors, isValid} = validatePostInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const {title, body} = req.body
    Post.findOneAndUpdate(
        { author, _id: req.params.id},
        {$set: {title, body}},
        {new: true}
    )
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(400).json({update: "Error updating existing post."}))
}

exports.deletePost = passport.authenticate("jwt", {session: false}),
(req, res) => {
    const author = req.user.user_name
Post.findOneAndDelete({author, _id: req.params.id})
.then(doc => res.status(200).json(doc))
.catch(err => res.status(400).json({ delete: "Error deleting a post."}))
}
