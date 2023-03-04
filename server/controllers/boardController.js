/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import mongoose from 'mongoose';
import Board from '../models/boardModel.js';
import User from '../models/userModel.js';
import Card from '../models/cardModel.js';
import Column from '../models/columnModel.js';
import Workspace from '../models/workspaceModel.js';
import { defaultMarks, errors } from '../helpers.js';

async function createBoard(req, res) {
  try {
    const { workspaceId, title, backgroundColor, backgroundImage } = req.body;
    const { userId } = req;
    // check if user is member of workspace
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    // create board
    const board = new Board({
      title,
      backgroundColor,
      backgroundImage,
      owner: userId,
      participants: [userId],
      marks: defaultMarks,
    });
    const savedBoard = await board.save();
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

async function getBoardById(req, res) {
  try {
    const { boardId } = req.params;
    const { userId } = req;
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Доска не найдена' });
    }
    const query = [
      {
        $match: { boards: mongoose.Types.ObjectId(boardId) },
      },
      {
        $lookup: {
          from: 'boards',
          localField: 'boards',
          foreignField: '_id',
          pipeline: [
            {
              $project: {
                _id: 1,
                title: 1,
                backgroundColor: 1,
                backgroundImage: 1,
              },
            },
          ],
          as: 'boards',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          avatarColor: 1,
          avatarImage: 1,
          boards: 1,
          participants: 1,
        },
      },
    ];
    const workspaces = await Workspace.aggregate(query);
    const workspace = workspaces[0];
    // check if user is member of workspace
    if (!workspace.participants.map((item) => item.toString()).includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    return res.status(200).json({ ...board._doc, workspace });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateBoardTitle(req, res) {
  try {
    const { boardId, title } = req.body;
    const { userId } = req;
    // check if user is member of workspace
    const workspace = await Workspace.findOne({ boards: boardId });
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    // add activity
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    const activity = {
      userId,
      action: `${user.userName} сменил(а) название доски c ${board.title} на ${title}`,
    };
    board.activities.push(activity);
    await board.save();
    // update title
    const updatedBoard = await Board.findByIdAndUpdate(boardId, { title }, { new: true });
    return res.status(200).json(updatedBoard);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateBoardBackground(req, res) {
  try {
    const { boardId, backgroundColor, backgroundImage } = req.body;
    const { userId } = req;
    // check if user is member of workspace
    const workspace = await Workspace.findOne({ boards: boardId });
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    // add activity
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    const activity = {
      userId,
      action: `${user.userName} сменил(а) фон доски ${board.title}`,
    };
    board.activities.push(activity);
    await board.save();
    // update background
    const updatedBoard = await Board.findByIdAndUpdate(
      boardId,
      { backgroundColor, backgroundImage },
      { new: true },
    );
    return res.status(200).json(updatedBoard);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function addNewMarkOnBoard(req, res) {
  try {
    const { boardId, color, text } = req.body;
    const { userId } = req;
    const board = await Board.findById(boardId);
    // check if user is member of workspace
    const workspace = await Workspace.findOne({ boards: boardId });
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    // create new mark
    const newMark = {
      color,
      text,
    };
    board.marks.push(newMark);
    await board.save();
    return res.status(200).json(board.marks.at(-1));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateMarkOnBoard(req, res) {
  try {
    const { boardId, color, text, index } = req.body;
    const { userId } = req;
    const board = await Board.findById(boardId);
    // check if user is member of workspace
    const workspace = await Workspace.findOne({ boards: boardId });
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    // update mark
    board.marks[index].color = color;
    board.marks[index].text = text;
    await board.save();
    return res.status(200).json({ message: 'Метка успешно обновлена' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deleteMarkOnBoard(req, res) {
  try {
    const { boardId, markId } = req.body;
    const { userId } = req;
    const board = await Board.findById(boardId);
    // check if user is member of workspace
    const workspace = await Workspace.findOne({ boards: boardId });
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    // delete mark
    board.marks = [...board.marks].filter((mark) => mark._id.toString() !== markId);
    await board.save();
    return res.status(200).json({ message: 'Метка успешно удалена' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getBoardParticipants(req, res) {
  try {
    const { boardId } = req.params;
    const { userId } = req;
    const board = await Board.findById(boardId);
    // check if user is member of workspace
    const workspace = await Workspace.findOne({ boards: boardId });
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    const query = [
      { $match: { _id: { $in: board.participants } } },
      { $addFields: { __order: { $indexOfArray: [board.participants, '$_id'] } } },
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

async function addMembers(req, res) {
  try {
    const { boardId, membersId } = req.body;
    const { userId } = req;
    const board = await Board.findById(boardId);
    const currentUser = await User.findById(userId);
    // check if user is member of workspace
    const workspace = await Workspace.findOne({ boards: boardId });
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }

    const promises = [];
    membersId.forEach((id) => {
      if (!board.participants.includes(id)) {
        const user = User.findById(id);
        promises.push(user);
      }
    });
    const users = await Promise.all(promises);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Этот(эти) пользователь(-ли) уже участник(и) доски' });
    }

    for (const user of users) {
      board.participants.push(user._id);
      if (!workspace.participants.includes(user._id.toString())) {
        workspace.participants.push(user._id);
        user.workspaces.push(workspace._id);
        await user.save();
      }
    }

    const activity = {
      userId,
      action: `${currentUser.userName} добавил(а) участников на доску ${board.title}`,
    };
    board.activities.push(activity);
    await board.save();
    await workspace.save();
    return res.status(200).json({ message: 'Участник(и) успешно добавлены' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deleteBoard(req, res) {
  try {
    const { boardId } = req.params;
    const { userId } = req;
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(400).json({ message: 'Такой доски не существует' });
    }
    // check if user is member of workspace
    const workspace = await Workspace.findOne({ boards: boardId });
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    // delete board from workspace boards array
    workspace.boards = [...workspace.boards].filter((item) => item.toString() !== boardId);
    await workspace.save();
    // delete board cards
    const allColumns = await Column.find().where('_id').in(board.columns).exec();
    const allCardsId = allColumns
      .reduce((acc, curr) => {
        acc.push(curr.cards);
        return acc;
      }, [])
      .flat();
    await Card.deleteMany({
      _id: {
        $in: allCardsId,
      },
    });
    // delete columns from Board
    await Column.deleteMany({
      _id: {
        $in: board.columns,
      },
    });
    // delete board
    await Board.findByIdAndDelete(boardId);
    return res.status(200).json({ message: 'Доска удалена' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function leaveBoardParticipants(req, res) {
  try {
    const { boardId } = req.body;
    const { userId } = req;
    const board = await Board.findById(boardId);
    const currentUser = await User.findById(userId);
    // check if user is member of workspace
    const workspace = await Workspace.findOne({ boards: boardId });
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    // add activity
    const activity = {
      userId,
      action: `${currentUser.userName} покинул доску ${board.title}`,
    };
    board.activities.push(activity);
    board.participants = [...board.participants].filter((item) => item.toString() !== userId);
    await board.save();
    return res.status(200).json({ message: 'Вы покинули доску' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function joinBoard(req, res) {
  try {
    const { boardId } = req.body;
    const { userId } = req;
    const board = await Board.findById(boardId);
    const currentUser = await User.findById(userId);
    // check if user is member of workspace
    const workspace = await Workspace.findOne({ boards: boardId });
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    board.participants.push(userId);
    // add activity
    const activity = {
      userId,
      action: `${currentUser.userName} присоединился к доске ${board.title}`,
    };
    board.activities.push(activity);
    await board.save();
    return res.status(200).json({ message: 'Вы присоединились к доске' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export {
  createBoard,
  addNewMarkOnBoard,
  getBoardById,
  updateBoardTitle,
  updateBoardBackground,
  getBoardParticipants,
  addMembers,
  updateMarkOnBoard,
  deleteMarkOnBoard,
  deleteBoard,
  leaveBoardParticipants,
  joinBoard,
};
