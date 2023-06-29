const express = require('express');
const { login, register } = require('../controllers/userController');
const allowCors = require('../middlewares/allowCors');

const router = express.Router();

router.post('/login', allowCors, login);
router.post('/register', allowCors, register);

module.exports = router;
