const mongoose = require('mongoose');

const user = new mongoose.Schema({
    userName: String,
    password: String,
    first_name: String,
    last_name: String,
    userType: String
  })

  var User = mongoose.model("User", user);

  module.exports = User;