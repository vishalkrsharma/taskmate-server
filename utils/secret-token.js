import jwt from 'jsonwebtoken';

const createSecretToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: 7 * 24 * 60 * 60,
  });
};

export default createSecretToken;
