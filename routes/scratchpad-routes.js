import { Router } from 'express';

import { getScratchpads, newScratchpad } from '../controllers/scratchpad-controller.js';
import { authentication } from '../middlewares/auth-middleware.js';

const router = Router();

router.get('/get-scratchpads', authentication, getScratchpads);
router.post('/new-scratchpad', authentication, newScratchpad);

export default router;
