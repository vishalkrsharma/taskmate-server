import express from 'express';
import { getTasks, newTask, editTask, deleteTask, getTask, getTaskDates } from '../controllers/task-controller.js';

const router = express.Router();

router.get('/get-tasks', getTasks);
router.get('/get-task', getTask);
router.post('/new-task', newTask);
router.put('/edit-task', editTask);
router.delete('/delete-task', deleteTask);
router.get('/get-task-dates', getTaskDates);

export default router;
