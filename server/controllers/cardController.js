import Card from '../models/cardModel.js';
import Column from '../models/columnModel.js';
import User from '../models/userModel.js';
import Board from '../models/boardModel.js';
import Workspace from '../models/workspaceModel.js';
import { errors } from '../helpers.js';

async function createCard(req, res) {
  try {
    const { boardId, columnId, title, marks, participants, position } = req.body;
    const { userId } = req;
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    // check if user is member of workspace
    const workspace = await Workspace.findOne({ boards: boardId });
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
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
    // check if user is member of workspace
    const workspace = await Workspace.findOne({ boards: boardId });
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    const card = await Card.findById(cardId);
    const column = await Column.findOne({ cards: card._id });
    return res.status(200).json({ card, column: column.title });
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
    const { userId } = req;
    // check if user is member of workspace
    const workspace = await Workspace.findOne({ boards: boardId });
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
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
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    // check if user is member of workspace
    const workspace = await Workspace.findOne({ boards: boardId });
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    // update card
    const card = await Card.findById(cardId);
    const updatedCard = await Card.findByIdAndUpdate(cardId, { title, description }, { new: true });
    // create activity
    let action = '';
    if (title) {
      action = `${user.userName} изменил(а) название карточки c ${card.title} на ${title}`;
    }
    if (description) {
      action = `${user.userName} изменил(а) описание карточки c ${card.description} на ${description}`;
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
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    // check if user is member of workspace
    const workspace = await Workspace.findOne({ boards: boardId });
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
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

async function getCardParticipants(req, res) {
  try {
    const { boardId, cardId } = req.params;
    const { userId } = req;
    // check if user is member of workspace
    const workspace = await Workspace.findOne({ boards: boardId });
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    const card = await Card.findById(cardId);
    const query = [
      { $match: { _id: { $in: card.participants } } },
      { $addFields: { __order: { $indexOfArray: [card.participants, '$_id'] } } },
      { $sort: { __order: 1 } },
      {
        $project: {
          __order: 0,
        },
      },
    ];
    const allParticipants = await User.aggregate(query);
    return res.status(200).json(allParticipants);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function addCardParticipant(req, res) {
  try {
    const { boardId, cardId } = req.params;
    const { participantId } = req.body;
    const { userId } = req;
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    // check if user is member of workspace
    const workspace = await Workspace.findOne({ boards: boardId });
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    const card = await Card.findById(cardId);
    card.participants.push(participantId);

    const participant = await User.findById(participantId);
    let action = '';
    if (userId === participantId) {
      action = `${user.userName} присоединился(лась) к карточке ${card.title}`;
    } else {
      action = `${user.userName} добавил(а) пользователя ${participant.userName} к карточке ${card.title}`;
    }
    const activity = {
      userId,
      action,
    };
    card.activities.push(activity);
    board.activities.push(activity);
    await board.save();
    await user.save();
    await card.save();
    return res.status(200).json({ message: 'Участник успешно добавлен' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deleteCardParticipant(req, res) {
  try {
    const { boardId, cardId } = req.params;
    const { participantId } = req.body;
    const { userId } = req;
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    // check if user is member of workspace
    const workspace = await Workspace.findOne({ boards: boardId });
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    const card = await Card.findById(cardId);

    const participants = [...card.participants].filter((id) => id.toString() !== participantId);
    card.participants = participants;

    const participant = await User.findById(participantId);
    let action = '';
    if (userId === participantId) {
      action = `${user.userName} покинул(а) карточку ${card.title}`;
    } else {
      action = `${user.userName} удалила пользователя ${participant.userName} из участников карточки ${card.title}`;
    }
    const activity = {
      userId,
      action,
    };
    card.activities.push(activity);
    board.activities.push(activity);
    await board.save();
    await user.save();
    await card.save();
    return res.status(200).json({ message: 'Участник успешно удален' });
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
  getCardParticipants,
  addCardParticipant,
  deleteCardParticipant,
};
