const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const { user } = req.body;
  const { token } = user;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, success) => {
      if (error) {
        res.json({ message: 'invalid token' });
      } else {
        next();
      }
    });
  } else {
    res.json(403).json({ message: 'token not found' });
  }
};

module.exports = { verifyToken };
