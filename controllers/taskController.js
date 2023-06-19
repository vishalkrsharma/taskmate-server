const Task = require('../models/Task');
const User = require('../models/User');

const getTask = async (req, res) => {};

const newTask = async (req, res) => {
  const { userId, taskInfo } = req.body;
  console.log({ userId, taskInfo });
  const { category, clientName, job, startDate, endDate, status, remarks } = taskInfo;
  try {
    const user = await User.findOne({ _id: userId });
    console.log({ _id: userId });
    if (!user) {
      res.status(403).json({ message: 'invalid user' });
      return;
    }

    const task = await Task.create({ category, clientName, job, startDate, endDate, status, remarks });

    res.status(201).json({ task });
  } catch (err) {
    res.json({ error: err });
  }
};

module.exports = { getTask, newTask };
