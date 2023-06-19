const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    category: String,
    clientName: String,
    job: String,
    startDate: Date,
    endDate: Date,
    status: String,
    remarks: String,
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('task', TaskSchema);

module.exports = Task;
