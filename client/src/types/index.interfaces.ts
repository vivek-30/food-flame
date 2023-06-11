import { 
  AuthContextState,
  AuthReducerAction,
  RecipeContextState,
  RecipeReducerAction
} from './index.types';
import { ReactNode, Dispatch } from 'react';

export interface IUser {
  user: string | null
}

export interface IAuthContextProp {
  children: ReactNode
}

export interface IAuthContext {
  state: AuthContextState,
  dispatch: Dispatch<AuthReducerAction>
}

export interface IRecipeContextProp {
  children: ReactNode
}

export interface IRecipeContext {
  state: RecipeContextState,
  dispatch: Dispatch<RecipeReducerAction>
}

interface ITimeStamp {
  createdAt: Date,
  updatedAt: Date
}

export interface IRecipe extends ITimeStamp {
  readonly _id: string,
  name: string,
  imageSRC?: string,
  description: string,
  ingredients: string[],
  cookingSteps: string[],
  userID: string
}

export interface ILogInCredentials {
  email: string,
  password: string
}

export interface ISignUpCredentials extends ILogInCredentials {
  username: string
}

export interface ICookingStep {
  index: number,
  content: string
}
