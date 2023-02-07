import { Router } from 'express';
import { createBoard, addNewMarkOnBoard } from '../controllers/boardController.js';
import verifyAuth from "../middlewares/auth.js";

const router = Router();

router.post('/', verifyAuth, createBoard);
router.post('/add-mark', verifyAuth, addNewMarkOnBoard);

export default router;
