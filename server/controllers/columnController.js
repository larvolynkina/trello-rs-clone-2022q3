import Column from '../models/columnModel.js';
import User from '../models/userModel.js';
import Board from '../models/boardModel.js';
import Card from '../models/cardModel.js';
import { errors } from '../helpers.js';

async function createColumn(req, res) {
  try {
    const { boardId, title } = req.body;
    const { userId } = req;
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    // check if user is member of this board
    if (!board.participants.includes(user._id)) {
      return res.status(403).json({
        message: errors.notABoardMember,
      });
    }
    // create column
    const column = new Column({
      title,
    });
    const savedColumn = await column.save();
    // add column id to board
    board.columns.push(savedColumn._id);
    // add column creations to board acivities
    const activity = {
      userId,
      action: `${user.userName} создал(а) колонку ${title} на доске ${board.title}`,
    };
    board.activities.push(activity);
    await board.save();
    return res.status(200).json(savedColumn);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getAllColumnsOnBoard(req, res) {
  try {
    const { boardId } = req.params;
    const board = await Board.findById(boardId);
    const allColumns = await Column.find().where('_id').in(board.columns).exec();
    return res.status(200).json(allColumns);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getAllColumns(_req, res) {
  try {
    const columns = await Column.find();
    return res.status(200).json(columns);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deleteColumn(req, res) {
  try {
    const { boardId, columnId } = req.params;
    const { userId } = req;
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    // check if user is member of this board
    if (!board.participants.includes(user._id)) {
      return res.status(403).json({
        message: errors.notABoardMember,
      });
    }
    const column = await Column.findById(columnId);
    // delete columnId from board columns array
    const newColumnsArray = [...board.columns].filter((id) => columnId !== id.toString());
    board.columns = newColumnsArray;
    await board.save();
    // delete all cards from Column
    await Card.deleteMany({
      _id: {
        $in: column.cards,
      },
    });
    // create activity
    const activity = {
      userId,
      action: `${user.userName} удалил(а) колонку ${column.title} на доске ${board.title} `,
    };
    await Column.findByIdAndDelete(columnId);
    board.activities.push(activity);
    await board.save();
    return res.status(200).json({ message: 'Колонка удалена' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateColumnTitle(req, res) {
  try {
    const { boardId, columnId, title } = req.body;
    const { userId } = req;
    // check if user is member of this board
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    if (!board.participants.includes(user._id)) {
      return res.status(403).json({
        message: errors.notABoardMember,
      });
    }
    // update column
    const column = await Column.findById(columnId);
    const updatedColumn = await Column.findByIdAndUpdate(columnId, { title }, { new: true });
    // create activity
    const activity = {
      userId,
      action: `${user.userName} изменил(а) название колонки c ${column.title} на ${title} на доске ${board.title}`,
    };
    board.activities.push(activity);
    await board.save();
    return res.status(200).json(updatedColumn);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateCardOrder(req, res) {
  try {
    const { boardId, data } = req.body;
    const { userId } = req;
    // check if user is member of this board
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    if (!board.participants.includes(user._id)) {
      return res.status(403).json({
        message: errors.notABoardMember,
      });
    }
    // update changed columns
    const promises = [];
    data.forEach((value) => {
      const updatedColumn = Column.findByIdAndUpdate(value.columnId, { cards: value.columnCards });
      promises.push(updatedColumn);
    });
    await Promise.all(promises);
    // get all columns on the board
    const allColumns = await Column.find().where('_id').in(board.columns).exec();
    return res.status(200).json(allColumns);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateColumnOrder(req, res) {
  try {
    const { boardId, data } = req.body;
    const { userId } = req;
    // check if user is member of this board
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    if (!board.participants.includes(user._id)) {
      return res.status(403).json({
        message: errors.notABoardMember,
      });
    }
    // update board columns array
    const updatedBoard = await Board.findByIdAndUpdate(boardId, { columns: data }, { new: true });
    return res.status(200).json(updatedBoard.columns);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export {
  createColumn,
  getAllColumnsOnBoard,
  deleteColumn,
  getAllColumns,
  updateColumnTitle,
  updateCardOrder,
  updateColumnOrder,
};
