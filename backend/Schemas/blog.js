const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    name: String,
    image: String,
    authorImage: String,
    author: String,
    body: String
  });

var Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;