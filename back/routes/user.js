const express = require('express')
const router = express.Router()

const { requireSignin, isAuth } = require('../controllers/auth')
const { userById, listPostsBySignedInUser } = require('../controllers/user')

router.get('/my/posts/:userId', isAuth, requireSignin, listPostsBySignedInUser) 

router.param('userId', userById)

module.exports = router