import User from '../models/user.js';
import createSecretToken from '../utils/secret-token.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.json({ message: 'User already exists' }).status(409);
    }

    const user = await User.create({ username, password });
    const token = createSecretToken(user._id);

    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.json({ message: 'User signed in successfully', success: true, user }).status(201);
  } catch (error) {
    console.log('[SIGNIN]', error);
    res
      .json({
        message: 'Internal Error',
      })
      .status(500);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({ message: 'All fields are required' }).status(400);
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ message: 'User not found' }).status(400);
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.json({ message: 'Incorrect password' }).status(401);
    }

    const token = createSecretToken(user._id);
    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.json({ message: 'User logged in successfully', success: true }).status(201);
    next();
  } catch (error) {
    console.error('[LOGIN]', error);
    res.json({ message: 'Internal Error' }).status(500);
  }
};
