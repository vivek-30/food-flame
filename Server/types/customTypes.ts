import { Router } from 'express';

export type RouteController = {
  route: string,
  controller: Router 
};
