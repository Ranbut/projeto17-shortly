import { Router } from 'express';
import { UserMe, ShowRanking } from '../controllers/user.controller.js';
import { validateUserMe } from '../middlewares/user.middleware.js';

const router = Router();

router.get('/users/me', validateUserMe, UserMe);
router.get('/ranking', ShowRanking);

export default router;