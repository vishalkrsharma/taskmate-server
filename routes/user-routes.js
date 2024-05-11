import { Router } from 'express';

import { authentication } from '../middlewares/auth-middleware.js';
import { changePassword, changeUsername } from '../controllers/user-controller.js';

const router = Router();

router.patch('/change-username', authentication, changeUsername);
router.patch('/change-password', authentication, changePassword);

export default router;
