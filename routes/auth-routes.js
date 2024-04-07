import { Router } from 'express';

import { login, signup } from '../controllers/auth-controller.js';
import { userVerification } from '../middlewares/auth-middleware.js';

const router = Router();

router.post('/', userVerification);
router.post('/signup', signup);
router.post('/login', login);

export default router;
