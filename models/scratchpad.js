import { Schema, model } from 'mongoose';

const schema = Schema(
  {
    userId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const scratchpad = model('scratchpad', schema);

export default scratchpad;
