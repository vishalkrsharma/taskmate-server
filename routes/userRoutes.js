const express = require('express');
const { login, register, changeUsername, changeEmail, changePassword } = require('../controllers/userController');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/changeusername', changeUsername);
router.post('/changeemail', changeEmail);
router.post('/changepassword', changePassword);

module.exports = router;
