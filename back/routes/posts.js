const express = require('express')
const router = express.Router()

const { list, create, readById, read } = require('../controllers/posts.js')
const { requireSignin, isAuth } = require('../controllers/auth')
const { userById } = require('../controllers/user')
const { listPostsBySignedInUser, photo } = require('../controllers/posts')

router.get('/blog', ( isAuth, list))
router.get('/blog/post/:id', (readById, read))//  -> get single post 

router.get('/blog/photo/:id', photo, readById) // -> get photo of single post 

router.post('/new-post/:userId', (isAuth, requireSignin, create)) // -> create single post

//router.delete('/post/:id/:userId', requireSignin, isAuth, isAdmin, remove)
router.get('/myblog/:userId', requireSignin, isAuth, listPostsBySignedInUser) 

router.param("userId", userById);

module.exports = router
