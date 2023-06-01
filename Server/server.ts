import App from './app';
import { config } from 'dotenv';
import userRouter from './Router/usersRouter';
import recipeRouter from './Router/recipesRouter';

import { RouteController } from './types/customTypes';
import IMiddlewareOptions from './types/interfaces/middlewareOptions.interface';

config(); // Load .env file on process.env

const port = Number(process.env.PORT) || 4000;
const cookieSecret = process.env.COOKIE_SECRET || 'my-cookie-secret';;
const databaseURI = process.env.DATABASE_URI || 'mongodb://localhost:27017';

const controllers: RouteController[] = [
  {
    route: 'user',
    controller: userRouter
  },
  {
    route: 'recipes',
    controller: recipeRouter
  }
];

const middlewareOptions: IMiddlewareOptions = {
  corsOptions: {
    origin: 'https://foodflame.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  },
  cookieParserOptions: {
    secret: cookieSecret,
  },
  rateLimitOptions: {
    max: 100,
    windowMs: 60 * 60 * 100,
    message: 'Warning: Too many requests from same IP address'
  }
};

const myApp = new App(port, databaseURI, cookieSecret);
try {
  myApp.establishDataBaseConnection();
  myApp.applyMiddlewares(middlewareOptions);
  myApp.handleAPIRoutes(controllers);
} catch(error) {
  console.log(error);
}
