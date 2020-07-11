const express = require('express')
const router = express.Router()
const { list } = require('../controllers/posts.js')
const { requireSignin, isAuth } = require('../controllers/users')


router.get('/blog', ( isAuth, list))

module.exports = router

// const Post = require('../models/Post')
// const validatePostInput = require('../validation/post')
// const passport = require('passport')


// const { getPostById, getPostByAuthor} = require('../controllers/posts')

// router.get("/post/:id", getPostById)
// router.get("/author/:author", getPostByAuthor)

// // create, delete, getPosts & update are user-specific so will be private APIs
// // authenticated APIs are in routes until I can use Passport.js in controllers

// router.get("http://localhost:8000/posts", 
// // passport middleware authenticates user 
// // returns a user object (null, user) on successful authentication
// passport.authenticate("jwt", { session: false }),
// (req, res) => {
//     // req contains the user object which is used to get user_name
//     // populate all posts posted by a certain user and return them
// Post.find({ author: req.user.user_name })
// .then(posts => res.status(200).json(posts))
// .catch(err => {
//     res.status(400).json({
//         user: "Error fetching posts from signed in user."
//     })
// })
// })

// // router.post("/create", create)
// router.post("/create", 
// passport.authenticate("jwt", { session: false }),
//  (req, res) => {
//     const author = req.user.user_name
//     const post = req.body
//     // check if user input is valid
//     const { errors, isValid } = validatePostInput(post)
//     if (!isValid) {
//         return res.status(400).json(errors)
//     }
//     post.author = author
//     const newPost = new Post(post)
// // save post to db
//     newPost.save()
//     .then(doc => res.json(doc))
//     .catch(err => console.log({create: "Error creating new post."}))
// }) 

// router.delete("/delete/:id", passport.authenticate("jwt", {session: false}),
// (req, res) => {
//     const author = req.user.user_name
// Post.findOneAndDelete({author, _id: req.params.id})
// .then(doc => res.status(200).json(doc))
// .catch(err => res.status(400).json({ delete: "Error deleting a post."}))
// })

// // put overwrites an entire entity, not just the part that you're updating
// // whereas patch applies a partial update so you only need to send the data that you want to update
// router.patch("/update/:id", 
// passport.authenticate("jwt", {session: false}),
// (req, res) => {
// const author = req.user.user_name
// const {errors, isValid} = validatePostInput(req.body)
// if (!isValid) {
//     return res.status(400).json(errors)
// }
// const {title, body} = req.body
// Post.findOneAndUpdate(
//     { author, _id: req.params.id},
//     {$set: {title, body}},
//     {new: true}
// )
// .then(doc => res.status(200).json(doc))
// .catch(err => res.status(400).json({update: "Error updating existing post."}))
// } )


// module.exports = router