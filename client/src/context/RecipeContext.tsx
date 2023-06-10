import { createContext, useReducer } from 'react';

import recipeReducer from '../reducers/recipeReducer';
import { RecipeContextState } from '../types/index.types';
import { IRecipeContext, IRecipeContextProp } from '../types/index.interfaces';

// Context and state.
export const RecipeContext = createContext<IRecipeContext | null>(null);
const initialState: RecipeContextState = {
  recipes: []
};

const RecipeContextProvider = ({ children }: IRecipeContextProp) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      { children }
    </RecipeContext.Provider>
  );
}

export default RecipeContextProvider;
