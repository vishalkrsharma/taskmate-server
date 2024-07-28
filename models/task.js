import { Schema, model } from 'mongoose';

const schema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = model('task', schema);

export default Task;
