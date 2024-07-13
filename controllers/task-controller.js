import Task from '../models/task.js';
import { startOfDay, endOfDay } from 'date-fns';

export const getTasks = async (req, res) => {
  try {
    const { userId } = req;
    let filter = { isArchived: false, userId };

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
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
    } else if (req.query.isArchived) {
      filter.isArchived = true;
    }

    const tasks = await Task.find(filter);

    return res.status(200).json({ tasks });
  } catch (error) {
    console.error('[GET_TASKS]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTask = async (req, res) => {
  try {
    const { taskId } = req.query;
    const { userId } = req;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!taskId) {
      return res.status(400).json({ message: 'Task Id is required' });
    }

    const task = await Task.findOne({ _id: taskId, userId });

    return res.status(200).json({ task });
  } catch (error) {
    console.error('[GET_TASK]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const newTask = async (req, res) => {
  try {
    const { title, description, date, isArchived } = req.body;
    const { userId } = req;

    console.log(date);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const dateObj = new Date(date);
    let istDate = new Date(dateObj.getTime() + 5.5 * 60 * 60 * 1000);
    const istString = istDate.toISOString();

    const task = await Task.create({ userId, title, description, date: new Date(istString), isArchived });

    return res.status(201).json({ message: 'Task created successfully.', success: true, task });
  } catch (error) {
    console.error('[NEW_TASK]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const editTask = async (req, res) => {
  try {
    const { taskId, title, description, date, isArchived } = req.body;
    const { userId } = req;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!taskId) {
      return res.status(400).json({ message: 'Task Id is required.' });
    }

    const task = await Task.findOne({ _id: taskId, userId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found.', success: false });
    }

    task.title = title;
    task.description = description;
    task.date = date;
    task.isArchived = isArchived;

    await task.save();

    return res.status(200).json({ message: 'Task edited successfully.', success: true, task });
  } catch (error) {
    console.error('[EDIT_TASK]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.query;
    const { userId } = req;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!taskId) {
      return res.status(400).json({ message: 'Task Id is required.' });
    }

    const task = await Task.deleteMany({ userId, _id: taskId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found.', success: false });
    }

    return res.status(200).json({ message: 'Task deleted successfully.', success: true });
  } catch (error) {
    console.error('[DELETE_TASK]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTaskDates = async (req, res) => {
  try {
    const { userId } = req;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const taskDates = await Task.find({ userId }).distinct('date');

    return res.status(200).json({ taskDates });
  } catch (error) {
    console.error('[GET_TASK_DAYS]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
