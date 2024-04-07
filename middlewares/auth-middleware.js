import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const userVerification = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false, message: 'Token not found.' }).status(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.json({ status: false, message: 'Invalid Token' });
    } else {
      const { _id } = data;
      const user = await User.findOne({ _id });
      if (user) return res.json({ status: true, user });
      else return res.json({ status: false, message: 'User not found.' });
    }
  });
};
