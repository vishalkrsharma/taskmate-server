const express = require('express');
const { getTasks, newTask } = require('../controllers/taskController');

const router = express.Router();

router.post('/newtask', newTask);
router.post('/gettasks', getTasks);

module.exports = router;
