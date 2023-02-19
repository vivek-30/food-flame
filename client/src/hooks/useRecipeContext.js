import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';

const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  const contextScopeError = new Error('useRecipeContext Hook Must Be Used WithIn RecipeContext.Provider Component.');

  if(context === null) {
    throw contextScopeError;
  }

  return {
    state: context.state,
    dispatch: context.dispatch
  };
}

export default useRecipeContext;
