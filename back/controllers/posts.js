const formidable = require('formidable')
const _ = require('lodash')
const moment = require('moment')
const fs = require('fs')
const Post = require("../models/Post");

const {
  errorHandler
} = require("../helpers/dbErrorHandler");

exports.read = (req, res) => {
  req.post.photo = undefined
  return res.json(req.post)
}


exports.list = (req, res) => {
  const sort = { title: 1 };
  Post.find()
  .select("-photo")
  .sort(sort)
 .limit(5)
 .exec((err, posts) => {
    if (err) {
      res.send(err);
    } 
     res.send(posts)
     
  // const date = moment(date).format('ll')
  })
}


  exports.listPostsBySignedInUser = (req, res) => {
    Post.find()
        .populate('user', '_id name')
        .sort('-created')
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(posts);
        });
};
 

exports.create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
  if(err) {

    console.log(err)
      return res.status(400).json({
          error: 'Image could not be uploaded'
      })
  }
  
  // check for all fields
  const { title, body } = fields
  if (!title || !body) {
  return res.status(400).json({
      error: "All fields are required"
  })
  }
  
  let post = new Post(fields)
  
  if(files.photo) {
      if (files.photo.size > 1000000) {
          return res.status(400).json({
              error: "Image should be less than 1MB in size."
          })
      }
      post.photo.data = fs.readFileSync(files.photo.path)
  post.photo.contentType = files.photo.type
  }
  post.save((err, result) => {
  if(err) {
  return res.status(400).json({
      error: errorHandler(err)
  })
  }
  res.json(result)
  })
  })
  }

exports.readById = (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
}


exports.photo = (req, res, next) => {
  if (req.post.photo.data) {
      res.set('Content-Type', req.post.photo.contentType)
      return res.send(req.post.photo.data)
  }
  next()
}