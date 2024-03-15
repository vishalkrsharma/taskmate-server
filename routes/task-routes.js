import express from 'express';
import { getTasks, newTask, editTask, deleteTask } from '../controllers/task-controller.js';
import verifyToken from '../middlewares/userMiddleware.js';

const router = express.Router();

router.post('/newtask', verifyToken, newTask);
router.post('/gettasks', verifyToken, getTasks);
router.post('/edittask', verifyToken, editTask);
router.post('/deletetask', verifyToken, deleteTask);

export default router;
