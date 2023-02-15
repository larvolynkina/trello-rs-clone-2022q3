import { Router } from 'express';
import {
  createBoard,
  addNewMarkOnBoard,
  getBoardById,
  updateBoardTitle,
  getBoardParticipants,
  updateBoardBackground,
  addMembers,
  updateMarkOnBoard,
} from '../controllers/boardController.js';
import verifyAuth from '../middlewares/auth.js';

const router = Router();

router.post('/', verifyAuth, createBoard);
router.patch('/', verifyAuth, updateBoardTitle);
router.patch('/background', verifyAuth, updateBoardBackground);
router.get('/:boardId', verifyAuth, getBoardById);
router.post('/add-mark', verifyAuth, addNewMarkOnBoard);
router.post('/update-mark', verifyAuth, updateMarkOnBoard);
router.post('/add-members', verifyAuth, addMembers);
router.get('/:boardId/participants', verifyAuth, getBoardParticipants);

export default router;
