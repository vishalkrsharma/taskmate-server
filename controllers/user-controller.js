import User from '../models/user.js';

export const changeUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const { userId } = req;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    const userWithUsername = await User.find({ username });

    if (userWithUsername.length !== 0) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    user.username = username;

    await user.save();

    return res.status(201).json({ message: 'Username changed sussessfully.', success: true, user });
  } catch (error) {
    console.error('[CHANGE_USERNAME]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { userId } = req;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    user.password = password;

    await user.save();

    return res.status(201).json({ message: 'Password changed sussessfully.', success: true, user });
  } catch (error) {
    console.error('[CHANGE_PASSWORD]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
