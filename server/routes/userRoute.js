import { Router } from 'express';
import {
  getAllUsers,
  getUserByID,
  getUserByEmail,
  updateUserName,
  updateUserAvatar,
  updateUserPassword,
} from '../controllers/userController.js';
import verifyAuth from '../middlewares/auth.js';

const router = Router();

router.get('/', verifyAuth, getAllUsers); // dev function
router.get('/:id', verifyAuth, getUserByID);
router.post('/email', verifyAuth, getUserByEmail);
router.patch('/', verifyAuth, updateUserName);
router.patch('/avatar', verifyAuth, updateUserAvatar);
router.patch('/:id', verifyAuth, updateUserPassword);

export default router;
