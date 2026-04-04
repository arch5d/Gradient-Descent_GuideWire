import { Router } from 'express';

import { evaluateClaim, predictRisk } from '../controllers/claimController.js';

const router = Router();

router.post('/claims/evaluate', evaluateClaim);
router.post('/risk/predict', predictRisk);

export default router;
