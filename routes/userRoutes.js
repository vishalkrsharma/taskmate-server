const express = require('express');
const { login, register, changeUsername } = require('../controllers/userController');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/changeusername', changeUsername);

module.exports = router;
