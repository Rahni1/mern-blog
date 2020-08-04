const User = require("../models/User");

// get userId
exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
    console.log('id retrieved')
        next();
    });
};

exports.listPostsBySignedInUser = (req, res) => {
    Post.find({ user: req.profile.id })
    .then(posts => res.status(200).json(posts))
    .catch(err =>
    console.log(err)
    )
}