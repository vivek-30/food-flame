import { ICookingStep, IRecipe, IUser } from './index.interfaces';

export type AuthContextState = IUser;
export type AuthReducerAction = {
  type: 'LOGIN' | 'LOGOUT',
  payload: string | null
}

// For all recipes.
type RecipesAction = {
  type: 'SET_RECIPES'
  payload: IRecipe[]
}

// For single recipe.
type RecipeAction = {
  type: 'ADD_RECIPE' | 'UPDATE_RECIPE' | 'REMOVE_RECIPE',
  payload: IRecipe
}

export type RecipeReducerAction = RecipesAction | RecipeAction;
export type RecipeContextState = {
  recipes: IRecipe[]
}

export type SignUpResponseData = {
  message: string,
  error?: string 
}

export type LogOutResponseData = SignUpResponseData;

export type LogInResponseData = {
  readonly _id: string,
  username: string,
  email: string,
  password: string,
  verified: boolean
  error?: string
}

export type RecipeErrorResonse = {
  error: string,
  message: string
}

export type PartialRecipeDetails = {
  name: string,
  description: string,
  imageSRC?: string,
  ingredients: string[]
}

export type CompleteRecipeDetails = PartialRecipeDetails & {
  cookingSteps: ICookingStep[]
}

export type RecipeDetailsForDB = PartialRecipeDetails & {
  userID: string | null
  cookingSteps: string[]
}

export type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';
