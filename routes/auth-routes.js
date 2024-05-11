import { Router } from 'express';

import { login, signup, logout } from '../controllers/auth-controller.js';
import { authentication } from '../middlewares/auth-middleware.js';

const router = Router();

router.post('/', authentication);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

export default router;
