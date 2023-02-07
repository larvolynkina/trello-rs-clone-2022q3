import { Router } from "express";
import { getAllUsers, getUserByID, updateUserName, updateUserPassword } from '../controllers/userController.js';
import verifyAuth from "../middlewares/auth.js";


const router = Router();

router.get('/', verifyAuth, getAllUsers); // dev function
router.get('/:id', verifyAuth, getUserByID);
router.patch('/', verifyAuth, updateUserName);
router.patch('/:id', verifyAuth, updateUserPassword);

export default router;