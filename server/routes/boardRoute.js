import { Router } from 'express';
import { createBoard, addNewMarkOnBoard, getBoardById } from '../controllers/boardController.js';
import verifyAuth from "../middlewares/auth.js";

const router = Router();

router.post('/', verifyAuth, createBoard);
router.get('/:boardId', verifyAuth, getBoardById);
router.post('/add-mark', verifyAuth, addNewMarkOnBoard);

export default router;
