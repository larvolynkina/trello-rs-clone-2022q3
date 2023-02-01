import { Router } from "express";
import { register, getAllUsers, getUserByID, updateUserName, updateUserPassword, login, getMe } from '../controllers/userController.js';
import verifyAuth from "../middlewares/auth.js";


const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyAuth, getMe);
router.get('/users', getAllUsers); // dev function
router.get('/users/:id', getUserByID);
router.patch('/users', updateUserName);
router.patch('/users/:id', updateUserPassword);

export default router;