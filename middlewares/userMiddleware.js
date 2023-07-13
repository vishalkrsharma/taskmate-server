const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const { user } = req.body;

  if (!user) {
    res.json({ message: 'Username and Password not found' });
  }

  try {
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
  } catch (err) {
    res.json({ error: err });
  }

  const { token } = user;
};

module.exports = { verifyToken };
