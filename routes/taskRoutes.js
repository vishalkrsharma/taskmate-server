const express = require('express');
const { getTasks, newTask, editTask, deleteTask } = require('../controllers/taskController');
const { verifyToken } = require('../middlewares/userMiddleware');

const router = express.Router();

router.post('/newtask', verifyToken, newTask);
router.post('/gettasks', verifyToken, getTasks);
router.post('/edittask', verifyToken, editTask);
router.post('/deletetask', verifyToken, deleteTask);

module.exports = router;
