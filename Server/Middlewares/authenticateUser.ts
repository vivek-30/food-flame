import {
  RequestHandler,
  Request,
  Response,
  NextFunction 
} from 'express';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

import Users from '../Models/userModel';
import { JwtPayload } from '../types/customTypes';

config();
const jwtSecret = process.env.JWT_SECRET || 'jwt-secret';

// For extending Request object of express. 
declare global {
  namespace Express {
    interface Request {
      id: ObjectId
    }
  } 
}

const authenticateUser: RequestHandler = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<Response | void> => {
  const token: string = req.signedCookies.jwt;

  if(!token) {
    return res.status(401).json({ message: 'Login or Signup to use this service.'});
  }

  try {
    const payload: JwtPayload = (await jwt.verify(token, jwtSecret) as JwtPayload);
    const user = await Users.findOne({ _id: payload._id });

    if(!user) {
      throw Error('Authentication failed, try to login again.');
    }

    req.id = user._id;

    next();
  } catch(error) {
    const errorMessage = (error as Error).message;
    res.status(401).json({ message: errorMessage });
  }
}

export default authenticateUser;
