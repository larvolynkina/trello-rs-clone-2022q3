import { Router } from 'express';
import { createColumn, getAllColumnsOnBoard } from '../controllers/columnController.js';

const router = Router();

router.post('/', createColumn);
router.get('/:boardId', getAllColumnsOnBoard);

export default router;