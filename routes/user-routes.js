import { Router } from 'express';

import { changePassword, changeUsername } from '../controllers/user-controller.js';

const router = Router();

router.patch('/change-username', changeUsername);
router.patch('/change-password', changePassword);

export default router;
