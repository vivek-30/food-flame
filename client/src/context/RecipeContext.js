import { createContext, useReducer } from 'react';

// Reducers.
import recipeReducer from '../reducers/recipeReducer';

// Context and state.
export const RecipeContext = createContext(null);
const initialState = {
  recipes: []
};

const RecipeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      { children }
    </RecipeContext.Provider>
  );
}

export default RecipeContextProvider;
