const express = require('express')
const router = express.Router()

const { list, create, readById, read, edit, deletePost, like } = require('../controllers/posts')
const { requireSignin, isAuth } = require('../controllers/auth')
const { userById, listPostsBySignedInUser } = require('../controllers/user')


router.get('/', ( isAuth, list))
router.get('/post/:id', (readById)) 

router.post('/new-post/:userId', (isAuth, requireSignin, create))

router.put('/:userId/:id/edit', (isAuth, requireSignin, edit))
router.put('/like/:userId/:id', (requireSignin, like))

router.delete('/post/:id/:userId', (requireSignin, isAuth, deletePost))

router.param("userId", userById);

module.exports = router
