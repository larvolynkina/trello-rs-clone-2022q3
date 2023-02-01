import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import chooseRandomColor from '../helpers.js';

async function register(req, res) {
  try {
    const { userName, email } = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(req.body.password, salt);

    const avatarColor = chooseRandomColor();

    const user = new User({
      userName,
      email,
      password: passwordHashed,
      avatarColor,
    });
    const savedUser = await user.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWS_SECRET,
      {
        expiresIn: '30d',
      },
    );

    const { password, ...restUserData } = savedUser._doc;

    res.status(200).json({
      ...restUserData,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Incorrect email or password' });
    }

    const isPasswordMatches = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatches) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWS_SECRET,
      {
        expiresIn: '30d',
      },
    );

    const { password, ...restUserData } = user._doc;

    return res.status(200).json({
      ...restUserData,
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getMe(req, res) {
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    const { password, ...restUserData } = user._doc;
    return res.status(200).json({
      ...restUserData,
    });
  } catch (error) {
    return res.status(404).json({ error: `User with id: ${userId} doesn't exist` });
  }
}

async function getAllUsers(_req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function getUserByID(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    const { password, ...restUserData } = user._doc;
    return res.status(200).json({
      ...restUserData,
    });
  } catch (error) {
    return res.status(404).json({ error: `User with id: ${id} doesn't exist` });
  }
}

async function updateUserName(req, res) {
  try {
    const { id, newUserName } = req.body;
    if (!newUserName || !id) {
      return res
        .status(400)
        .json({ error: `Fields 'newUserName and id' required in request body` });
    }
    const user = await User.findByIdAndUpdate(id, { userName: newUserName }, { new: true });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateUserPassword(req, res) {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: `Fields 'currentPassword and newPassword' required in request body` });
    }

    const currentUser = await User.findById(id);
    const isPasswordMatches = await bcrypt.compare(currentPassword, currentUser.password);
    if (!isPasswordMatches) {
      return res.status(400).json({ message: 'Wrong password' });
    }
    if (currentPassword === newPassword) {
      return res.status(400).json({ message: 'New password must be different' });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(newPassword, salt);
    const user = await User.findByIdAndUpdate(id, { password: passwordHashed }, { new: true });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export { register, getAllUsers, getUserByID, updateUserName, updateUserPassword, login, getMe };
