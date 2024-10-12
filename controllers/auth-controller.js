import User from '../models/user.js';
import createSecretToken from '../utils/secret-token.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists.' });
    }

    const user = await User.create({ username, password });
    const token = createSecretToken(user._id);

    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: true,
      secure: true,
    });
    return res.status(201).json({ message: 'User signed up successfully.', success: true, user });
  } catch (error) {
    console.error('[SIGNIN]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    const token = createSecretToken(user._id);
    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: true,
      secure: true,
    });

    return res.status(201).json({ message: 'User logged in successfully.', success: true, user });
  } catch (error) {
    console.error('[LOGIN]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.json({
      success: true,
      status: 200,
    });
  } catch (error) {
    console.error('[LOGOUT]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
