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
  deleteMarkOnBoard,
  deleteBoard,
  leaveBoardParticipants,
  joinBoard,
} from '../controllers/boardController.js';
import verifyAuth from '../middlewares/auth.js';

const router = Router();

router.post('/', verifyAuth, createBoard);
router.delete('/:boardId', verifyAuth, deleteBoard);
router.patch('/', verifyAuth, updateBoardTitle);
router.patch('/background', verifyAuth, updateBoardBackground);
router.get('/:boardId', verifyAuth, getBoardById);
router.post('/add-mark', verifyAuth, addNewMarkOnBoard);
router.post('/update-mark', verifyAuth, updateMarkOnBoard);
router.post('/delete-mark', verifyAuth, deleteMarkOnBoard);
router.post('/add-members', verifyAuth, addMembers);
router.get('/:boardId/participants', verifyAuth, getBoardParticipants);
router.post('/leave', verifyAuth, leaveBoardParticipants);
router.post('/join', verifyAuth, joinBoard);

export default router;
