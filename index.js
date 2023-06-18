const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const bcryptSalt = bcrypt.genSaltSync(5);
const jwtSecret = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!(username && email && password)) {
      res.status(400).json({ message: 'All fields compulsory' });
      return;
    }
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      res.status(400).json({ message: 'username or email taken' });
      return;
    }

    const encryptPassword = await bcrypt.hash(password, bcryptSalt);

    const user = await User.create({
      username,
      email,
      password: encryptPassword,
    });

    user.password = undefined;

    res.status(201).json({ user });
  } catch (err) {
    res.json({ error: err });
  }
  console.log({ username, email, password });
});

app.post('/api/login', async (req, res) => {
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

  const token = jwt.sign({ id: user._id, username }, jwtSecret);
  user.password = undefined;

  res.json({ user, token });
});

app.listen(5000, () => {
  console.log('Server Port: 5000');
});
