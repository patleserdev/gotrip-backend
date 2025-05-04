const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Assure l'unicité de l'email
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },

  roles: [String],
});

const User = mongoose.model("users", userSchema);

module.exports = User;
