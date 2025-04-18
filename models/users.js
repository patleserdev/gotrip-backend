const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  roles: [String]
});

const User = mongoose.model('users', userSchema);

module.exports = User;
