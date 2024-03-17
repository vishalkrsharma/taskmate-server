import express from 'express';
import { getTasks, newTask, editTask, deleteTask, getTask } from '../controllers/task-controller.js';
import verifyToken from '../middlewares/userMiddleware.js';

const router = express.Router();

router.get('/get-tasks', getTasks);
router.get('/get-task', getTask);
router.post('/new-task', newTask);
router.put('/edit-task', editTask);
router.delete('/delete-task', deleteTask);

export default router;
