import { Router } from 'express';

import { authentication } from '../middlewares/auth-middleware.js';
import { getTasks, newTask, editTask, deleteTask, getTask, getTaskDates } from '../controllers/task-controller.js';

const router = Router();

router.get('/get-tasks', authentication, getTasks);
router.get('/get-task', authentication, getTask);
router.post('/new-task', authentication, newTask);
router.put('/edit-task', authentication, editTask);
router.delete('/delete-task', authentication, deleteTask);
router.get('/get-task-dates', authentication, getTaskDates);

export default router;
