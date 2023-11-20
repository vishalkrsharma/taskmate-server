import express from 'express';
import { login, register, changeUsername, changeEmail, changePassword } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/changeusername', changeUsername);
router.post('/changeemail', changeEmail);
router.post('/changepassword', changePassword);

export default router;
