import { Router } from 'express';
import { createCard, updateCardTitleOrDescr, deleteCard, getAllCards, getAllCardsOnBoard, getCardById } from '../controllers/cardController.js';
import verifyAuth from "../middlewares/auth.js";

const router = Router();

router.post('/', verifyAuth, createCard);
router.patch('/', verifyAuth, updateCardTitleOrDescr);
router.delete('/:boardId/:cardId', verifyAuth, deleteCard);
router.get('/:boardId/:cardId', verifyAuth, getCardById);
router.get('/', verifyAuth, getAllCards);
router.get('/:boardId', verifyAuth, getAllCardsOnBoard);

export default router;
