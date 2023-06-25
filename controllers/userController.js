const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    res.json({ message: 'user not found' });
    return;
  }

  if (!bcrypt.compareSync(password, user.password)) {
    res.json({ message: 'wrong password' });
    return;
  }

  const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET);

  const finalUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    token,
  };
  res.status(200).json(finalUser);
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!(username && email && password)) {
      res.status(400).json({ message: 'All fields compulsory' });
      return;
    }
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      res.status(403).json({ message: 'username or email taken' });
      return;
    }

    const encryptPassword = await bcrypt.hash(password, bcrypt.genSaltSync(5));

    const user = await User.create({
      username,
      email,
      password: encryptPassword,
    });

    res.status(201);
  } catch (err) {
    res.json({ error: err });
  }
};

module.exports = { login, register };
