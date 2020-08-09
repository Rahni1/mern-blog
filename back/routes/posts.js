const express = require('express')
const router = express.Router()

const { list, create, readById, read } = require('../controllers/posts.js')
const { requireSignin, isAuth } = require('../controllers/auth')
const { userById, listPostsBySignedInUser } = require('../controllers/user')
const { photo } = require('../controllers/posts')

router.get('/', ( isAuth, list))
router.get('/blog/post/:id', (readById)) //  -> get single post 

// router.get('/blog/photo/:id', (photo, readById)) // -> get photo of single post 

router.post('/new-post/:userId', (isAuth, requireSignin, create)) // -> create single post


//router.delete('/post/:id/:userId', requireSignin, isAuth, isAdmin, remove)

router.param("userId", userById);

module.exports = router
