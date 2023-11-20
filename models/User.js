import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
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

const User = model('user', UserSchema);

export default User;
