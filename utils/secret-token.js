import jwt from 'jsonwebtoken';

const createSecretToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: 7 * 24 * 60 * 60,
  });
};

export default createSecretToken;
