import { Router } from 'express';
import { createCard, updateCardTitleOrDescr, deleteCard, getAllCards, getAllCardsOnBoard } from '../controllers/cardController.js';

const router = Router();

router.post('/', createCard);
router.patch('/', updateCardTitleOrDescr);
router.delete('/:userId/:boardId/:cardId', deleteCard);
router.get('/', getAllCards);
router.get('/:boardId', getAllCardsOnBoard);

export default router;
