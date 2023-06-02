import { Router } from 'express';
import { IUser } from './interfaces/model';

export type RouteController = {
  route: string,
  controller: Router 
};

export type Token = {
  user: IUser,
  token: string
}
