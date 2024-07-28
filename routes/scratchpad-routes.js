import { Router } from 'express';

import { getScratchpads, newScratchpad, getScratchpad, addMember } from '../controllers/scratchpad-controller.js';
import { authentication } from '../middlewares/auth-middleware.js';

const router = Router();

router.get('/get-scratchpads', authentication, getScratchpads);
router.get('/get-scratchpad', authentication, getScratchpad);
router.post('/new-scratchpad', authentication, newScratchpad);
router.put('/add-member', authentication, addMember);

export default router;
