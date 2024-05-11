import jwt from 'jsonwebtoken';

export const authentication = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false, message: 'Token not found.' }).status(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.json({ status: false, message: 'Invalid Token' });
    } else {
      const { _id } = data;
      req.userId = _id;
      next();
    }
  });
};
