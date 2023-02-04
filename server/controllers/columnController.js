import Column from '../models/columnModel.js';
import User from '../models/userModel.js';
import Board from '../models/boardModel.js';
import Card from '../models/cardModel.js';

async function createColumn(req, res) {
  try {
    const { userId, boardId, title } = req.body;
    // create column
    const column = new Column({
      title,
    });
    const savedColumn = await column.save();
    // add column id to board
    const board = await Board.findById(boardId);
    board.columns.push(savedColumn._id);
    await board.save();
    // add column creations to board acivities
    const user = await User.findById(userId);
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
    const { userId, boardId, columnId } = req.params;
    // check if user is member of this board
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    if (!board.participants.includes(user._id)) {
      return res.status(403).json({
        message: 'You are not a member of this board',
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
    return res.status(200).json({ message: 'Column deleted' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateColumnTitle(req, res) {
  try {
    const { userId, boardId, columnId, title } = req.body;
    // check if user is member of this board
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    if (!board.participants.includes(user._id)) {
      return res.status(403).json({
        message: 'You are not a member of this board',
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

export { createColumn, getAllColumnsOnBoard, deleteColumn, getAllColumns, updateColumnTitle };
