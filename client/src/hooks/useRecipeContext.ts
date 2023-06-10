import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import { IRecipeContext } from '../types/index.interfaces';

const useRecipeContext = (): IRecipeContext => {
  const context = useContext<IRecipeContext | null>(RecipeContext);
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
