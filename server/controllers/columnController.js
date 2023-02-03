import Column from '../models/columnModel.js';
import User from '../models/userModel.js';
import Board from '../models/boardModel.js';

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
    const allColumnsId = board.columns;
    const allColumnsPromises = [];
    allColumnsId.forEach((columnId) => {
      const promis = Column.findById(columnId);
      allColumnsPromises.push(promis);
    });
    const allColumns = await Promise.all(allColumnsPromises);
    return res.status(200).json(allColumns);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export { createColumn, getAllColumnsOnBoard };
