import { Router } from 'express';
import { ObjectId } from 'mongoose';
import { IUser } from './interfaces/model.interface';

export type RouteController = {
  path: string,
  router: Router 
};

export type UserToken = {
  user: IUser,
  token: string
}

export type JwtPayload = {
  _id: ObjectId,
  expiresIn: number
}
