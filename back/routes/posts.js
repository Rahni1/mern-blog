const express = require('express')
const router = express.Router()

const { list, create } = require('../controllers/posts.js')
const { requireSignin, isAuth } = require('../controllers/users')


router.get('/blog', ( isAuth, list))
router.post('/blog/post', create);

module.exports = router

