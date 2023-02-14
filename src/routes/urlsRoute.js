import { Router } from 'express';
import { CreateUrl, GetUrl, OpenShortUrl, DeleteUrl } from '../controllers/urls.controller.js';
import { validateUrlSchema } from '../middlewares/urls.middleware.js';

const router = Router();

router.post('/urls/shorten', validateUrlSchema, CreateUrl);
router.get('/urls/:id', GetUrl);
router.get('/urls/open/:shortUrl', OpenShortUrl);
router.delete('/urls/:id', DeleteUrl);

export default router;