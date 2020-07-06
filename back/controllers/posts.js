const Post = require('../models/Post')

// public routes
// fetches posts by id
exports.getPostById = (req, res) => {
    Post.find({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(err => res.status(400).json({ id: "Error fetching post by id"}))
}

// fetches posts by author
exports.getPostByAuthor = (req, res) => {
    Post.find({ author: req.params.author })
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(400).json({
        author: "Error fetching posts from specific author"
    }))
}