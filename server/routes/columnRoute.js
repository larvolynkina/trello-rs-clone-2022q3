import { Router } from 'express';
import {
  createColumn,
  getAllColumnsOnBoard,
  deleteColumn,
  getAllColumns,
  updateColumnTitle,
  updateCardOrder,
} from '../controllers/columnController.js';

const router = Router();

router.post('/', createColumn);
router.patch('/', updateColumnTitle);
router.get('/', getAllColumns);
router.get('/:boardId', getAllColumnsOnBoard);
router.delete('/:userId/:boardId/:columnId', deleteColumn);
router.post('/update-card-order', updateCardOrder);

export default router;
