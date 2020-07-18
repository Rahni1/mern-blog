const express = require('express')
const router = express.Router()

const { list, create, readById } = require('../controllers/posts.js')
const { requireSignin, isAuth } = require('../controllers/auth')
const { userById } = require('../controllers/user')
const { listPostsBySignedInUser } = require('../controllers/posts')

router.get('/blog', ( isAuth, list))
router.post('/blog/post', (isAuth, create))
router.get('/post/:id', (readById))
//router.delete('/post/:id/:userId', requireSignin, isAuth, isAdmin, remove)
router.get('/myblog/:userId', requireSignin, isAuth, listPostsBySignedInUser)

router.param("userId", userById);

module.exports = router

