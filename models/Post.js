const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const slugify = require("slugify");
const marked = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const domPurify = createDomPurify(new JSDOM().window);
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: { type: String, required: true, unique: true },
  body: {
    type: String,
    required: true,
  },
  diamonds: [{ type: ObjectId, ref: "User" }],
  author: {
    id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
});
// Create slug from post title
postSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  // markdown - sanitize and convert to html
  if (this.body) {
    this.sanitizedHtml = domPurify.sanitize(marked(this.body));
  }
  next();
});

module.exports = mongoose.model("Post", postSchema);
