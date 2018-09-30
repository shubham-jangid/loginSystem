const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  },
  password: {
    type: String,
    minlength: 5,
    required: true
  }
});

module.exports = mongoose.model("users", UserSchema);
