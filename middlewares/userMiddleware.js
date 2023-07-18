const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error) => {
      if (error) res.json({ message: 'invalid token' });
      else next();
    });
  } else {
    res.json(403).json({ message: 'token not found' });
  }
};

module.exports = { verifyToken };
