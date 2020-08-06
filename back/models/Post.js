const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        photo: {
            data: Buffer,
            contentType: String
              },
        author: {
        //   id: { 
            type: ObjectId,
            ref: "User"
        },
        // username: String
    // },
        date: {
            type: Date,
            default: Date.now
        },
    }
)

module.exports = mongoose.model("Post", postSchema)