import { Router } from 'express';
import { signup, login, getMe } from '../controllers/аuthController.js';
import verifyAuth from '../middlewares/auth.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', verifyAuth, getMe);

export default router;
