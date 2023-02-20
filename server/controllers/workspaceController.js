/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import Workspace from '../models/workspaceModel.js';
import User from '../models/userModel.js';
import Board from '../models/boardModel.js';
import Column from '../models/columnModel.js';
import Card from '../models/cardModel.js';
import { chooseRandomColor, errors } from '../helpers.js';

async function createWorkspace(req, res) {
  try {
    const { title, description, websiteAddress } = req.body;
    const { userId } = req;
    const avatarColor = chooseRandomColor();

    let count = 1;
    let isAlreadyExist = true;
    while (isAlreadyExist) {
      isAlreadyExist = await Workspace.findOne({ shortTitle: `${title}${count}` });
      if (isAlreadyExist) {
        count += 1;
      }
    }

    const workspace = new Workspace({
      title,
      owner: userId,
      shortTitle: `${title}${count}`,
      description,
      websiteAddress,
      avatarColor,
      participants: [userId],
    });
    const savedWorkspace = await workspace.save();

    const user = await User.findById(userId);
    user.workspaces.push(savedWorkspace._id);
    await user.save();
    return res.status(200).json(savedWorkspace);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateWorkspaceTextFields(req, res) {
  try {
    const { workspaceId, title, description, shortTitle, websiteAddress } = req.body;
    const { userId } = req;
    const currentWorkspace = await Workspace.findById(workspaceId);
    // check if user is member of workspace
    if (!currentWorkspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    const isShortTitleAlreadyExist = await Workspace.findOne({ shortTitle });
    if (isShortTitleAlreadyExist && shortTitle !== currentWorkspace.shortTitle) {
      return res.status(400).json({ message: 'Такое имя уже существует' });
    }

    const workspace = await Workspace.findByIdAndUpdate(
      workspaceId,
      { title, description, shortTitle, websiteAddress },
      { new: true, runValidators: true },
    );
    return res.status(200).json(workspace);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deleteWorkspace(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req;
    const currentWorkspace = await Workspace.findById(id);
    if (!currentWorkspace) {
      return res.status(400).json({ message: 'Такого рабочего пространства не существует' });
    }
    // check if user is member of workspace
    if (!currentWorkspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    // delete workspace from participants User array
    const { participants } = currentWorkspace;
    participants.forEach(async (participantId) => {
      const user = await User.findById(participantId);
      const updatedWorkspaces = [...user.workspaces].filter((item) => item.toString() !== id);
      user.workspaces = updatedWorkspaces;
      await user.save();
    });
    // delete nested boards, columns, cards
    const allBoards = await Board.find().where('_id').in(currentWorkspace.boards).exec();
    allBoards.forEach(async (board) => {
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
    });
    await Board.deleteMany({
      _id: {
        $in: allBoards,
      },
    });
    // delete workspace
    await Workspace.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Рабочее пространство удалено' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getAllUsersWorkspaces(req, res) {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    const query = [
      { $match: { _id: { $in: user.workspaces } } },
      { $addFields: { __order: { $indexOfArray: [user.workspaces, '$_id'] } } },
      { $sort: { __order: 1 } },
      {
        $project: {
          __order: 0,
        },
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
                activities: 1,
              },
            },
          ],
          as: 'boards',
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { participantsIds: '$participants' },
          localField: 'participants',
          foreignField: '_id',
          pipeline: [
            {
              $match: {
                $expr: { $in: ['$_id', '$$participantsIds'] },
              },
            },
            {
              $addFields: {
                sort: {
                  $indexOfArray: ['$$participantsIds', '$_id'],
                },
              },
            },
            { $sort: { sort: 1 } },
            { $addFields: { sort: '$$REMOVE' } },
            {
              $project: {
                _id: 1,
                userName: 1,
                avatarColor: 1,
                avatarImage: 1,
              },
            },
          ],
          as: 'participants',
        },
      },
    ];
    const allWorkspaces = await Workspace.aggregate(query);
    return res.status(200).json(allWorkspaces);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function leaveWorkspaceParticipants(req, res) {
  try {
    const { workspaceId } = req.body;
    const { userId } = req;
    // check if user is member of workspace
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    workspace.participants = [...workspace.participants].filter(
      (item) => item.toString() !== userId,
    );
    await workspace.save();
    return res.status(200).json({ message: 'Вы покинули рабочее пространство' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function addMembers(req, res) {
  try {
    const { workspaceId, membersId } = req.body;
    const { userId } = req;
    // check if user is member of workspace
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace.participants.includes(userId)) {
      return res.status(403).json({ message: errors.notAWorkspaceMember });
    }
    // get users
    const promises = [];
    membersId.forEach((id) => {
      if (!workspace.participants.includes(id)) {
        const user = User.findById(id);
        promises.push(user);
      }
    });
    const users = await Promise.all(promises);

    if (users.length === 0) {
      return res
        .status(400)
        .json({ message: 'Этот(эти) пользователь(-ли) уже участник(и) рабочего пространства' });
    }
    for (const user of users) {
      workspace.participants.push(user._id);
      user.workspaces.push(workspace._id);
      await user.save();
    }
    await workspace.save();
    return res.status(200).json({ message: 'Участник(и) успешно добавлены' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export {
  createWorkspace,
  updateWorkspaceTextFields,
  deleteWorkspace,
  getAllUsersWorkspaces,
  leaveWorkspaceParticipants,
  addMembers,
};
