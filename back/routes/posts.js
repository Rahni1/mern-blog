const express = require('express')
const router = express.Router()

const { list, create, readById, read, edit, deletePost, diamond } = require('../controllers/posts')
const { requireSignin, isAuth } = require('../controllers/auth')
const { userById, listPostsBySignedInUser } = require('../controllers/user')


router.get('/', (list))
router.get('/post/:id', (readById)) 

router.post('/new-post/:userId', (isAuth, requireSignin, create))

router.put('/:userId/:id/edit', (isAuth, requireSignin, edit))
router.put('/diamond/:userId/:id', (requireSignin, diamond))

router.delete('/post/:id/:userId', (isAuth, requireSignin, deletePost))

router.param("userId", userById);

module.exports = router
