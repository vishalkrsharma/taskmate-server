const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('user', UserSchema);

module.exports = User;
