import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(5));
});

const user = model('user', schema);

export default user;
