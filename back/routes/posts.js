const express = require('express')
const router = express.Router()

const {getPosts, getPostById, getPostByAuthor} = require('../controllers/posts')

router.get("/", getPosts)

router.get("/post/:id", getPostById)
router.get("/author/:author", getPostByAuthor)

module.exports = router