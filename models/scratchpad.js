import { Schema, model } from 'mongoose';

const schema = Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: [],
      },
    ],
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Scratchpad = model('scratchpad', schema);

export default Scratchpad;
