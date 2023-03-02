import { Router } from 'express';
import { UserMe, ShowRanking } from '../controllers/user.controller.js';
import { validateAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/users/me', validateAuth, UserMe);
router.get('/ranking', ShowRanking);

export default router;