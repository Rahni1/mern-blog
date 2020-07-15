const Post = require("../models/Post");
const moment  = require('moment');
const bodyParser = require('body-parser')

const {
  errorHandler
} = require("../helpers/dbErrorHandler");

exports.list = (req, res) => {
    Post.find({}, function (err, result) {
      if (err) {
        res.send(err);
      } else {
       res.send(result)
       
    //   const date = moment(result[1, 2, 3].date).format('ll')
  
        
//         let date = result.date 
// for (date = 0; date < result.length; date++) {
//   const formatDate = moment(result.date).format('ll');
//   console.log(formatDate)
      }
    });
  };

 

exports.create = (req, res) => {
  const {title, body, date, author} = req.body
  let post = new Post({title, body, date, author})

  post.save()
  .then(response => {
  res.send(response)
    .catch(err => {
      res.send(err)
})
})
}

exports.readById = (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
}