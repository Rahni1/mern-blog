const Post = require("../models/Post");
const {
  errorHandler
} = require("../helpers/dbErrorHandler");

exports.list = (req, res) => {
    Post.find({}, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  };