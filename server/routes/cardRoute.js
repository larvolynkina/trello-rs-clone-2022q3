import { Router } from 'express';
import {
  createCard,
  updateCardTitleOrDescr,
  deleteCard,
  getAllCards,
  getAllCardsOnBoard,
  getCardById,
  getCardParticipants,
  addCardParticipant,
  deleteCardParticipant,
  addCheckListToCard,
  deleteCheckListFromCard,
  addCheckListItem,
  deleteCheckListItem,
  toggleChecklistItemChecked,
  updateChecklistTitle,
} from '../controllers/cardController.js';
import verifyAuth from '../middlewares/auth.js';

const router = Router();

router.post('/', verifyAuth, createCard);
router.patch('/', verifyAuth, updateCardTitleOrDescr);
router.delete('/:boardId/:cardId', verifyAuth, deleteCard);
router.get('/:boardId/:cardId', verifyAuth, getCardById);
router.get('/', verifyAuth, getAllCards);
router.get('/:boardId', verifyAuth, getAllCardsOnBoard);
router.get('/:boardId/:cardId/participants', verifyAuth, getCardParticipants);
router.post('/:boardId/:cardId/add-participant', verifyAuth, addCardParticipant);
router.post('/:boardId/:cardId/delete-participant', verifyAuth, deleteCardParticipant);
router.post('/:boardId/:cardId/add-checklist', verifyAuth, addCheckListToCard);
router.post('/:boardId/:cardId/delete-checklist', verifyAuth, deleteCheckListFromCard);
router.post('/:boardId/:cardId/add-checklist-item', verifyAuth, addCheckListItem);
router.post('/:boardId/:cardId/delete-checklist-item', verifyAuth, deleteCheckListItem);
router.post('/:boardId/:cardId/toggle-checklist-item', verifyAuth, toggleChecklistItemChecked);
router.post('/:boardId/:cardId/update-checklist-title', verifyAuth, updateChecklistTitle);

export default router;
