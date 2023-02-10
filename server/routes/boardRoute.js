import { Router } from 'express';
import { createBoard, addNewMarkOnBoard, getBoardById, updateBoardTitle, getBoardParticipants } from '../controllers/boardController.js';
import verifyAuth from "../middlewares/auth.js";

const router = Router();

router.post('/', verifyAuth, createBoard);
router.patch('/', verifyAuth, updateBoardTitle);
router.get('/:boardId', verifyAuth, getBoardById);
router.post('/add-mark', verifyAuth, addNewMarkOnBoard);
router.get('/:boardId/participants', verifyAuth, getBoardParticipants);

export default router;
