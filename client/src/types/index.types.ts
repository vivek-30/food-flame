import { ICookingStep, IRecipe } from './index.interfaces';

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
  verified: boolean,
  error?: string
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
  userID: string | null,
  cookingSteps: string[]
}

export type RecipeErrorResonse = {
  error: string,
  message: string
}

export type RecipesResponseData = RecipeErrorResonse | IRecipe[];
export type RecipeResponseData = RecipeErrorResonse | IRecipe;
export type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';
