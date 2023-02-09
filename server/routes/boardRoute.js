import { Router } from 'express';
import { createBoard, addNewMarkOnBoard, getBoardById, updateBoardTitle } from '../controllers/boardController.js';
import verifyAuth from "../middlewares/auth.js";

const router = Router();

router.post('/', verifyAuth, createBoard);
router.patch('/', verifyAuth, updateBoardTitle);
router.get('/:boardId', verifyAuth, getBoardById);
router.post('/add-mark', verifyAuth, addNewMarkOnBoard);

export default router;
