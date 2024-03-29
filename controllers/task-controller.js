import Task from '../models/task.js';
import { startOfDay, endOfDay } from 'date-fns';

export const getTasks = async (req, res) => {
  try {
    const { userId } = req.query;
    let filter = { userId };

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.query.past) {
      filter.date = {
        $lt: startOfDay(new Date()),
      };
    } else if (req.query.today) {
      filter.date = {
        $gte: startOfDay(new Date()),
        $lt: endOfDay(new Date()),
      };
    } else if (req.query.future) {
      filter.date = {
        $gte: endOfDay(new Date()),
      };
    } else if (req.query.date) {
      filter.date = {
        $gte: startOfDay(req.query.date),
        $lt: endOfDay(req.query.date),
      };
    }

    const tasks = await Task.find(filter);

    res.status(200).json({ tasks });
  } catch (error) {
    console.log('[GET_TASKS]', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTask = async (req, res) => {
  try {
    const { userId, taskId } = req.query;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
    }

    if (!taskId) {
      res.status(400).json({ message: 'Task Id is required' });
    }

    const task = await Task.findOne({ _id: taskId, userId });

    res.status(200).json({ task });
  } catch (error) {
    console.log('[GET_TASK]', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const newTask = async (req, res) => {
  try {
    let { userId, title, content, date, isArchived } = req.body;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
    }

    const dateObj = new Date(date);
    let istDate = new Date(dateObj.getTime() + 5.5 * 60 * 60 * 1000);
    const istString = istDate.toISOString();

    const task = await Task.create({ userId, title, content, date: new Date(istString), isArchived });

    res.status(201).json({ message: 'Task created successfully.', success: true, task });
  } catch (error) {
    console.log('[NEW_TASK]', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const editTask = async (req, res) => {
  try {
    const { taskId, userId, title, content, date, isArchived } = req.body;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
    }

    if (!taskId) {
      res.status(400).json({ message: 'Task Id is required' });
    }

    const task = await Task.findOne({ _id: taskId, userId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found.', success: false });
    }

    task.title = title;
    task.content = content;
    task.date = date;
    task.isArchived = isArchived;

    await task.save();

    res.status(200).json({ message: 'Task edited successfully.', success: true, task });
  } catch (error) {
    console.log('[EDIT_TASK]', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { userId, taskId } = req.query;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
    }

    if (!taskId) {
      res.status(400).json({ message: 'Task Id is required' });
    }

    const task = await Task.deleteMany({ userId, _id: taskId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found.', success: false });
    }

    res.status(200).json({ message: 'Task deleted successfully.', success: true });
  } catch (error) {
    console.log('[DELETE_TASK]', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTaskDates = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
    }

    const taskDates = await Task.find({ userId }).distinct('date');

    res.status(200).json({ taskDates });
  } catch (error) {
    console.log('[GET_TASK_DAYS]', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
