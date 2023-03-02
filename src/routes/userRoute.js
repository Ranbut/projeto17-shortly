import { Router } from 'express';
import { UserMe } from '../controllers/user.controller.js';
import { validateUserMe } from '../middlewares/user.middleware.js';

const router = Router();

router.get('/users/me', validateUserMe, UserMe);

export default router;