const express = require('express');
const { getTask, newTask } = require('../controllers/taskController');

const router = express.Router();

router.post('/newtask', newTask);
router.get('/gettask', getTask);

module.exports = router;
