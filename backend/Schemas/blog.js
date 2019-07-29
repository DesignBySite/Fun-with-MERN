const mongoose = require('mongoose');

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    body: String
  });

var Campground = mongoose.model("Campround", campgroundSchema);

module.exports = Campground;