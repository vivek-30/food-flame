import { ObjectId } from 'mongoose';

interface ITimeStamp {
  createdAt: NativeDate,
  updatedAt: NativeDate
}

export interface IRecipe extends ITimeStamp {
  readonly _id: ObjectId,
  name: string,
  imageSRC?: string,
  description: string,
  ingredients: string[],
  cookingSteps: string[],
  userID: string
}

export interface IUser {
  readonly _id: ObjectId,
  username: string,
  email: string,
  password: string,
  verified: boolean
}

export interface ILogInCredentials {
  email: string,
  password: string
}

export interface ISignUpCredentials extends ILogInCredentials {
  username: string
}

