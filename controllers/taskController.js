const mongoose = require('mongoose');
const Task = require('../models/Task');
const User = require('../models/User');

const getTasks = async (req, res) => {
  const { userId } = req.body;
  try {
    const tasks = await Task.find({ userId });
    res.status(200).json({ tasks });
  } catch (err) {
    res.json({ error: err });
  }
};

const newTask = async (req, res) => {
  const { userId, taskInfo } = req.body;
  const { category, clientName, job, startDate, endDate, status, remarks } = taskInfo;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(403).json({ message: 'invalid user' });
      return;
    }

    const task = await Task.create({ userId, category, clientName, job, startDate, endDate, status, remarks });

    res.status(201).json({ task });
  } catch (err) {
    res.json({ error: err });
  }
};

module.exports = { getTasks, newTask };
