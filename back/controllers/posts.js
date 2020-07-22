const Post = require("../models/Post");

const {
  errorHandler
} = require("../helpers/dbErrorHandler");

exports.list = (req, res) => {
  const sort = { title: 1 };
  Post.find()
  .sort(sort)
 .limit(5)
 .exec((err, posts) => {
    if (err) {
      res.send(err);
    } 
     res.send(posts)
     
  //   const date = moment(result[1, 2, 3].date).format('ll')

      
//         let date = result.date 
// for (date = 0; date < result.length; date++) {
//   const formatDate = moment(result.date).format('ll');
//   console.log(formatDate)
});
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

