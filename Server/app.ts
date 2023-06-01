import mongoose, { Error } from 'mongoose';
import { Server, createServer } from 'http';
import express, { Application } from 'express';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import { RouteController } from './types/customTypes';
import IMiddlewareOptions from './types/interfaces/middlewareOptions.interface';

class App {
  private readonly expressApp: Application;
  private readonly server: Server;

  // Environment variables
  private readonly port: number;
  private readonly databaseURI: string;
  private readonly cookieSecret: string | string[];

  constructor (
    port: number,
    databaseURI: string,
    cookieSecret?: string | string[],
  ) {
    this.port = port;
    this.databaseURI = databaseURI;
    this.cookieSecret = cookieSecret || 'cookie-super-secret';

    // Create express app and server
    this.expressApp = express();
    this.server = createServer(this.expressApp);
  }

  public handleAPIRoutes(routes: RouteController[]): void {
    routes.forEach(({ route, controller }): void => {
      this.expressApp.use(route, controller);
    });
  }

  public applyMiddlewares(middlewareOptions: IMiddlewareOptions): void {
    const {
      corsOptions,
      rateLimitOptions,
      cookieParserOptions
    } = middlewareOptions;

    this.expressApp.use(express.json());
    if(corsOptions) {
      this.expressApp.use(cors(corsOptions));
    }
    
    if(cookieParserOptions) {
      this.expressApp.use(cookieParser(cookieParserOptions.secret));
    } else {
      this.expressApp.use(cookieParser(this.cookieSecret));
    }
    
    if(rateLimitOptions) {
      this.expressApp.use(rateLimit(rateLimitOptions));
    }
  }

  public establishDataBaseConnection(): void {
    mongoose.set('strictQuery', false);
    mongoose.connect(this.databaseURI)
    .then((): void => {
      this.server.listen(this.port, () => {
        console.log(`Server is running at PORT: ${this.port}`);
      });
    })
    .catch((error: Error): void => {
      console.log(error);
      throw new Error('Failed to establish database connection' + error.message);
    });
  }
}

export default App;
