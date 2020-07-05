const express = require('express')
const router = express.Router()

const {getPosts, getPostById, getPostByAuthor, create, update, deletePost} = require('../controllers/posts')

router.get("/", getPosts)
router.get("/post/:id", getPostById)
router.get("/author/:author", getPostByAuthor)

router.post("/create", create)

// put overwrites an entire entity, not just the part that you're updating
// whereas patch applies a partial update so you only need to send the data that you want to update
router.patch("/update/:id", update)

router.delete("/delete/:id", deletePost)

module.exports = router