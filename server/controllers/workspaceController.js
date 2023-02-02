/* eslint-disable no-await-in-loop */
import Workspace from '../models/workspaceModel.js';
import User from '../models/userModel.js';
import chooseRandomColor from '../helpers.js';

async function createWorkspace(req, res) {
  try {
    const { userId, title, description, websiteAddress } = req.body;
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

    const isShortTitleAlreadyExist = await Workspace.findOne({ shortTitle });
    const currentWorkspace = await Workspace.findById(workspaceId);
    if (isShortTitleAlreadyExist && shortTitle !== currentWorkspace.shortTitle) {
      return res.status(400).json({ message: 'Short Title already exist' });
    }

    const workspace = await Workspace.findByIdAndUpdate(
      workspaceId,
      { title, description, shortTitle, websiteAddress },
      { new: true, runValidators: true },
    );
    return res.status(200).json(workspace);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteWorkspace(req, res) {
  try {
    const { id } = req.params;
    const workspace = await Workspace.findById(id);
    const { participants } = workspace;
    // delete workspace
    await Workspace.findByIdAndDelete(id);
    // delete workspace from participants User array
    participants.forEach(async (userId) => {
      const user = await User.findById(userId);
      const index = user.workspaces.indexOf(id);
      const updateWorkspaces = [
        ...user.workspaces.slice(0, index),
        ...user.workspaces.slice(index + 1),
      ];
      user.workspaces = updateWorkspaces;
      await user.save();
    });
    return res.status(200).json({ message: 'Workspace deleted' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export { createWorkspace, updateWorkspaceTextFields, deleteWorkspace };
