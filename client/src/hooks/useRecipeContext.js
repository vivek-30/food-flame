import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';

const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  const contextScopeError = new Error('This Hook Must Be Used WithIn RecipeContext.Provider Component.');

  if(context === null) {
    throw contextScopeError;
  }

  return [context.state, context.dispatch];
}

export default useRecipeContext;
