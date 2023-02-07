import Card from '../models/cardModel.js';
import Column from '../models/columnModel.js';
import User from '../models/userModel.js';
import Board from '../models/boardModel.js';
import { errors } from '../helpers.js';

async function createCard(req, res) {
  try {
    const { boardId, columnId, title, marks, participants, position } = req.body;
    const { userId } = req;
    // check if user is member of this board
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    if (!board.participants.includes(user._id)) {
      return res.status(403).json({
        message: errors.notABoardMember,
      });
    }
    // create card
    const card = new Card({
      title,
      participants,
      marks,
      position,
    });
    const savedCard = await card.save();
    //  add card to Column cards array
    const column = await Column.findById(columnId);
    column.cards.push(savedCard._id);
    await column.save();
    // add card creation to card activities array
    const activity = {
      userId,
      action: `${user.userName} создал(а) карточку ${title} в колонке ${column.title}`,
    };
    savedCard.activities.push(activity);
    await savedCard.save();
    // add card creation to board activities array
    board.activities.push(activity);
    await board.save();
    return res.status(200).json(savedCard);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getCardById(req, res) {
  try {
    const { boardId, cardId } = req.params;
    const { userId } = req;
    // check if user is member of this board
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    if (!board.participants.includes(user._id)) {
      return res.status(403).json({
        message: errors.notABoardMember,
      });
    }
    const card = await Card.findById(cardId);
    return res.status(200).json(card);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getAllCards(_req, res) {
  try {
    const cards = await Card.find();
    return res.status(200).json(cards);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getAllCardsOnBoard(req, res) {
  try {
    const { boardId } = req.params;
    const board = await Board.findById(boardId);
    const allColumns = await Column.find().where('_id').in(board.columns).exec();
    const allCardsId = allColumns
      .reduce((acc, curr) => {
        acc.push(curr.cards);
        return acc;
      }, [])
      .flat();
    const allCards = await Card.find().where('_id').in(allCardsId).exec();
    return res.status(200).json(allCards);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateCardTitleOrDescr(req, res) {
  try {
    const { boardId, cardId, title, description } = req.body;
    const { userId } = req;
    // check if user is member of this board
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    if (!board.participants.includes(user._id)) {
      return res.status(403).json({
        message: errors.notABoardMember,
      });
    }
    // update card
    const card = await Card.findById(cardId);
    const updatedCard = await Card.findByIdAndUpdate(cardId, { title, description }, { new: true });
    // create activity
    let action = '';
    if (title && !description) {
      action = `${user.userName} изменил(а) название карточки c ${card.title} на ${title}`;
    }
    if (!title && description) {
      action = `${user.userName} изменил(а) описание карточки c ${card.description} на ${description}`;
    }
    if (title && description) {
      action = `${user.userName} изменил(а) название карточки c ${card.title} на ${title}, описание карточки c ${card.description} на ${description}`;
    }
    const activity = {
      userId,
      action,
    };
    updatedCard.activities.push(activity);
    await updatedCard.save();
    board.activities.push(activity);
    await board.save();
    return res.status(200).json(updatedCard);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deleteCard(req, res) {
  try {
    const { boardId, cardId } = req.params;
    const { userId } = req;
    // check if user is member of this board
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    if (!board.participants.includes(user._id)) {
      return res.status(403).json({
        message: errors.notABoardMember,
      });
    }
    const card = await Card.findById(cardId);
    // delete cardId from column cards array
    const column = await Column.findOne({ cards: cardId });
    const newCardsArray = [...column.cards].filter((id) => cardId !== id.toString());
    column.cards = newCardsArray;
    await column.save();
    // create activity
    const activity = {
      userId,
      action: `${user.userName} удалил(а) карточку ${card.title} из колонки ${column.title} на доске ${board.title} `,
    };
    await Card.findByIdAndDelete(cardId);
    board.activities.push(activity);
    await board.save();
    return res.status(200).json({ message: 'Карточка удалена' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export {
  createCard,
  updateCardTitleOrDescr,
  deleteCard,
  getAllCards,
  getAllCardsOnBoard,
  getCardById,
};
