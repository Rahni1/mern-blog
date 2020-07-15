const express = require('express')
const router = express.Router()

const { list, create, readById } = require('../controllers/posts.js')
const { requireSignin, isAuth } = require('../controllers/users')


router.get('/blog', ( isAuth, list))
router.post('/blog/post', (isAuth, create))
router.get('/post/:id', (readById))

module.exports = router

