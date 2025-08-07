import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
};
export const verifyToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
