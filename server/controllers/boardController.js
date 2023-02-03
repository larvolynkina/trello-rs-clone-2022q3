import Board from '../models/boardModel.js';
import User from '../models/userModel.js';
import Workspace from '../models/workspaceModel.js';
import { defaultMarks } from '../helpers.js';

async function createBoard(req, res) {
  try {
    const { userId, workspaceId, title, backgroundColor, backgroundImage } = req.body;
    const board = new Board({
      title,
      backgroundColor,
      backgroundImage,
      participants: [userId],
      marks: defaultMarks,
    });
    const savedBoard = await board.save();

    const workspace = await Workspace.findById(workspaceId);
    workspace.boards.push(savedBoard._id);
    await workspace.save();

    const user = await User.findById(userId);

    const activity = {
      userId,
      action: `${user.userName} создал(а) доску ${title} в рабочем пространстве ${workspace.title}`,
    };

    savedBoard.activities.push(activity);
    await savedBoard.save();

    return res.status(200).json(savedBoard);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function addNewMark(req, res) {
  try {
    const { color, text } = req.body;
    const { id } = req.params;
    const newMark = {
      color,
      text,
      checked: true,
    };
    const board = await Board.findById(id);
    board.marks.push(newMark);
    await board.save();
    return res.status(200).json(board.marks.at(-1));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export { createBoard, addNewMark };
