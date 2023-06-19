const mongooose = require('mongoose');

const TaskSchema = mongooose.Schema(
  {
    user: mongoose.Schema.Types.ObjectId,
    category: String,
    clientName: String,
    job: String,
    startDate: Date,
    endDate: Date,
    status: Number,
    remarks: String,
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('task', TaskSchema);

module.exports = Task;
