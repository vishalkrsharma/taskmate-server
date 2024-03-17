import { login, signup } from '../controllers/auth-controller.js';
import { Router } from 'express';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;
