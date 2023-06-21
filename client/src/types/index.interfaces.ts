export interface IUser {
  user: string | null
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
