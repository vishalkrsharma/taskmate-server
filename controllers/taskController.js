const mongoose = require('mongoose');
const Task = require('../models/Task');
const User = require('../models/User');

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
    console.log('yes');
  } catch (err) {
    res.json({ error: err });
  }
};

const editTask = async (req, res) => {
  const { taskId } = req.body;
};
const deleteTask = async (req, res) => {
  const { taskId } = req.body;
  try {
    const task = await Task.findOne({ _id: taskId });

    if (!task) {
      res.json(404).json({ message: 'task not found in db' });
      return;
    }

    const deletedTask = await Task.deleteOne({ _id: taskId });

    res.statu(200).json({ message: 'task deleted' });
  } catch (err) {
    res.json({ error: err });
  }
};

module.exports = { getTasks, newTask, editTask, deleteTask };
