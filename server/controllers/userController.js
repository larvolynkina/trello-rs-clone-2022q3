import bcrypt from 'bcrypt';
import { unlink } from 'fs/promises';
import User from '../models/userModel.js';
import Workspace from '../models/workspaceModel.js';
import { errors } from '../helpers.js';

async function getAllUsers(_req, res) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getUserByID(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: 'Пользователя не существует' });
    }
    const { password, ...restUserData } = user._doc;
    return res.status(200).json({
      ...restUserData,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getUserByEmail(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Пользователя с указанным email не существует' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateUserName(req, res) {
  try {
    const { newUserName } = req.body;
    const { userId } = req;
    // check if new Name unique
    const isUserNameExist = await User.findOne({ userName: newUserName });
    if (isUserNameExist) {
      return res.status(400).json({ message: 'Такое имя пользователя уже существует' });
    }
    // update user
    const user = await User.findByIdAndUpdate(userId, { userName: newUserName }, { new: true });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateUserAvatar(req, res) {
  try {
    const { avatarColor, avatarImage } = req.body;
    const { userId } = req;
    const user = await User.findById(userId);
    // check if old avatarImage to remove
    if (avatarColor && user.avatarImage) {
      const splitPath = user.avatarImage.split('/');
      const path = `./${splitPath[3]}/${splitPath[4]}`;
      await unlink(path);
    }
    // update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatarColor, avatarImage },
      { new: true },
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateUserPassword(req, res) {
  try {
    const { userId } = req;
    const { currentPassword, newPassword } = req.body;

    const currentUser = await User.findById(userId);
    const isPasswordMatches = await bcrypt.compare(currentPassword, currentUser.password);
    if (!isPasswordMatches) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }
    if (currentPassword === newPassword) {
      return res.status(400).json({ message: 'Новый пароль должен отличаться от старого' });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(newPassword, salt);
    const user = await User.findByIdAndUpdate(userId, { password: passwordHashed }, { new: true });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export {
  getAllUsers,
  getUserByID,
  getUserByEmail,
  updateUserName,
  updateUserAvatar,
  updateUserPassword,
};
