import Task from '../models/Task.js';

const getTasks = async (req, res) => {
  const { user } = req.body;
  try {
    const tasks = await Task.find({ userId: user._id });
    res.status(200).json({ tasks });
  } catch (err) {
    res.json({ error: err });
  }
};

const newTask = async (req, res) => {
  const { user, taskInfo } = req.body;
  const { category, clientName, job, startDate, endDate, status, remarks } = taskInfo;
  try {
    const task = await Task.create({ userId: user._id, category, clientName, job, startDate, endDate, status, remarks });

    res.status(201).json({ task });
  } catch (err) {
    res.json({ error: err });
  }
};

const editTask = async (req, res) => {
  const { task } = req.body;
  const { _id, category, clientName, job, startDate, endDate, status, remarks } = task;
  try {
    const foundTask = await Task.findById({ _id });
    if (!foundTask) {
      res.json(404).json({ message: 'Task not found' });
      return;
    }

    await Task.findOneAndUpdate({ _id: _id }, { category, clientName, job, startDate, endDate, status, remarks });
    res.status(200).json({ message: 'Task Edited' });
  } catch (err) {
    res.json({ error: err });
  }
};
const deleteTask = async (req, res) => {
  const { taskId } = req.body;
  try {
    const foundTask = await Task.findOne({ _id: taskId });

    if (!foundTask) {
      res.json(404).json({ message: 'task not found in db' });
      return;
    }

    await Task.deleteOne({ _id: taskId });

    res.status(200).json({ message: 'task deleted' });
  } catch (err) {
    res.json({ error: err });
  }
};

export { getTasks, newTask, editTask, deleteTask };
