const mongoose = require('mongoose');

const user = new mongoose.Schema({
    userName: {
      type: String,
      required: [true, 'Username is required']
    },
    created: {
      type: Date,
      required: [true, 'Created date is required']
    },
    password: String,
    first_name: String,
    last_name: String,
    userType: String
  })

  var User = mongoose.model("User", user);

  module.exports = User;