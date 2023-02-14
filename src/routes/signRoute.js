import { Router } from 'express';
import { Signup, Signin } from '../controllers/sign.controller.js';
import { validateSignupSchema, validateSigninSchema } from '../middlewares/sign.middleware.js';

const router = Router();

router.post('/signup', validateSignupSchema, Signup);
router.post('/signin', validateSigninSchema, Signin);

export default router;