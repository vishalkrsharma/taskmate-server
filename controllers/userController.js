const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(403).json({ message: 'user not found' });
      return;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      res.status(403).json({ message: 'wrong password' });
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

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.json({ error: err });
  }
};

const changeUsername = async (req, res) => {
  let { newUsername, user } = req.body;
  const token = req.headers.authorization.split(' ')[1];

  if (newUsername.length === 0) {
    res.json('invalid username');
    return;
  }

  if (await User.findOne({ username: newUsername })) {
    res.json('username taken');
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
    res.json('invalid email');
    return;
  }

  if (await User.findOne({ email: newEmail })) {
    res.json('email taken');
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
  console.log('a');
  let { newPassword, user } = req.body;
  if (newPassword.length === 0) {
    res.json('invalid password');
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
    res.status(200).json({ message: 'done' });
  } catch (err) {
    res.json({ error: err });
  }
};

module.exports = { login, register, changeUsername, changeEmail, changePassword };
