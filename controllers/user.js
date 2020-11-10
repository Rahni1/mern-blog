const User = require("../models/User");
const Post = require("../models/Post");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    // res.json(req.profile._id)
    next();
  });
};

exports.listPostsBySignedInUser = (req, res) => {
  User.findOne({ id: req.profile._id })
    .select("-password")

    .then((id) => {
      Post.find({ "author.id": req.profile._id }).exec((err, posts) => {
        if (err && req.profile._id !== id) {
          return res.status(422).json({ error: err });
        }
        return res.status(200).json({ posts });
      });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found" });
    });
};
