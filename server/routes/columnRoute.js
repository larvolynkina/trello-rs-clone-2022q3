import { Router } from 'express';
import {
  createColumn,
  getAllColumnsOnBoard,
  deleteColumn,
  getAllColumns,
  updateColumnTitle,
  updateCardOrder,
  updateColumnOrder,
  copyColumn,
} from '../controllers/columnController.js';
import verifyAuth from "../middlewares/auth.js";

const router = Router();

router.post('/', verifyAuth, createColumn);
router.patch('/', verifyAuth, updateColumnTitle);
router.get('/', verifyAuth, getAllColumns);
router.get('/:boardId', verifyAuth, getAllColumnsOnBoard);
router.delete('/:boardId/:columnId', verifyAuth, deleteColumn);
router.post('/update-card-order', verifyAuth, updateCardOrder);
router.post('/update-column-order', verifyAuth, updateColumnOrder);
router.post('/copy', verifyAuth, copyColumn);

export default router;
