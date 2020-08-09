const User = require("../models/User");
const Post = require("../models/Post")

// get userId
exports.userById = (req, res, next, id) => {
    User.findById(id)
    .exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        // res.json(req.profile._id)
        next();
    });
};

exports.listPostsBySignedInUser = (req, res) => {
User.findOne({id: req.profile._id})
.select("-password")

.then(user => {
     Post.find({'author.id': req.profile._id})
     .populate("author", "_id name")
     .exec((err,posts) => {
         if(err){
            return res.status(422).json({error: err})
         }
         let user = req.profile 
         return res.status(200).json({user, posts})
     })
}).catch(err => {
    return res.status(404).json({error:"User not found"})
})
}


// exports.listPostsBySignedInUser = (req, res) => {
//    res.json('authenticated')
//     }