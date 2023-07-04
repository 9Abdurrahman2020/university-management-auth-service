import jwt, { Secret } from 'jsonwebtoken';

const createToken = (payload: object, secret: Secret, expiresIn: string) => {
  return jwt.sign(payload, secret, { expiresIn: expiresIn });
};
const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret);
};
export const jwtHelper = {
  createToken,
  verifyToken,
};
