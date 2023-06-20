const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    status: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('task', TaskSchema);

module.exports = Task;
