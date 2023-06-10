const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id: {type: Number, required: true},
  post_title: {type: String, required: true},
  post_content: String,
  post_url: String,
  author_id: {type: Number, required: true},
  created_at: {type: Date, required: true},
  post_img: String
});

const Post = module.exports = mongoose.model('Post', postSchema);