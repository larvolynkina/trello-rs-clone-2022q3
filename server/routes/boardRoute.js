import { Router } from 'express';
import { createBoard, addNewMark } from '../controllers/boardController.js';

const router = Router();

router.post('/', createBoard);
router.post('/:id/add-mark', addNewMark);

export default router;
