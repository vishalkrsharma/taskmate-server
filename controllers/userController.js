const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      res.status(403).json({ message: 'Wrong Password' });
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
  } catch (err) {
    res.json({ message: err });
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!(username && email && password)) {
      res.status(400).json({ message: 'All fields compulsory' });
      return;
    }
    const usernameUser = await User.findOne({ username });
    const emailUser = await User.findOne({ email });

    if (usernameUser || emailUser) {
      res.status(403).json({ message: 'Username or Email taken' });
      return;
    }

    const encryptPassword = await bcrypt.hash(password, bcrypt.genSaltSync(5));

    const user = await User.create({
      username,
      email,
      password: encryptPassword,
    });

    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET);

    const finalUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token,
    };

    res.status(201).json(finalUser);
  } catch (err) {
    res.json({ error: err });
  }
};

const changeUsername = async (req, res) => {
  let { newUsername, user } = req.body;
  const token = req.headers.authorization.split(' ')[1];

  if (newUsername.length === 0) {
    res.json('Invalid Username');
    return;
  }

  if (await User.findOne({ username: newUsername })) {
    res.json('Username Taken');
    return;
  }

  try {
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          username: newUsername,
        },
      }
    );

    user.username = newUsername;
    user.token = token;
    res.status(200).json(user);
  } catch (err) {
    res.json({ error: err });
  }
};

const changeEmail = async (req, res) => {
  let { newEmail, user } = req.body;
  const token = req.headers.authorization.split(' ')[1];

  if (newEmail.length === 0) {
    res.json('Invalid email');
    return;
  }

  if (await User.findOne({ email: newEmail })) {
    res.json('Email taken');
    return;
  }

  try {
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          email: newEmail,
        },
      }
    );

    user.email = newEmail;
    user.token = token;
    res.status(200).json(user);
  } catch (err) {
    res.json({ error: err });
  }
};

const changePassword = async (req, res) => {
  let { newPassword, user } = req.body;
  if (newPassword.length === 0) {
    res.json('Invalid password');
    return;
  }

  try {
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          password: await bcrypt.hash(newPassword, bcrypt.genSaltSync(5)),
        },
      }
    );
    res.status(200).json({ message: 'Done' });
  } catch (err) {
    res.json({ error: err });
  }
};

module.exports = { login, register, changeUsername, changeEmail, changePassword };
