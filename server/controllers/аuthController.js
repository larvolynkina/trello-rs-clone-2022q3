import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { chooseRandomColor } from '../helpers.js';

async function signup(req, res) {
  try {
    const { userName, email } = req.body;
    const lowercaseEmail = email.toLowerCase();
    // check is userName unique
    const isUserNameExist = await User.findOne({ userName });
    if (isUserNameExist) {
      return res.status(400).json({ message: 'Такое имя пользователя уже существует' });
    }
    // check is email unique
    const isEmailExist = await User.findOne({ email: lowercaseEmail });
    if (isEmailExist) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(req.body.password, salt);

    const avatarColor = chooseRandomColor();

    const user = new User({
      userName,
      email: lowercaseEmail,
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

    return res.status(200).json({
      ...restUserData,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email } = req.body;
    const lowercaseEmail = email.toLowerCase();
    const user = await User.findOne({ email: lowercaseEmail });

    if (!user) {
      return res.status(400).json({ message: 'Неверно указаны почта или пароль' });
    }

    const isPasswordMatches = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatches) {
      return res.status(400).json({ message: 'Неверно указаны почта или пароль' });
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
    return res.status(500).json({ message: error.message });
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
    return res.status(500).json({ message: error.message });
  }
}

export { signup, login, getMe };
