import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const userVerification = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.json({ error: 'Unauthorized', message: 'Token not found' }).status(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      console.log(user);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
};
