import { Router } from 'express';
import {
  createColumn,
  getAllColumnsOnBoard,
  deleteColumn,
  getAllColumns,
  updateColumnTitle,
} from '../controllers/columnController.js';

const router = Router();

router.post('/', createColumn);
router.patch('/', updateColumnTitle);
router.get('/', getAllColumns);
router.get('/:boardId', getAllColumnsOnBoard);
router.delete('/:userId/:boardId/:columnId', deleteColumn);

export default router;
