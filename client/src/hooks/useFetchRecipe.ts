import { useState } from 'react';
import { RECIPE_BASE_URI } from '../constants/URIs';
import { IRecipe } from '../types/index.interfaces';
import { RecipeErrorResonse, RecipeResponseData } from '../types/index.types';

const useFetchRecipe = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [error, setError] = useState<RecipeErrorResonse | null>(null);

  const fetchRecipe = async (userID: string | null, recipeID: string | undefined) => {
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    
    const respose = await fetch(`${RECIPE_BASE_URI}/${recipeID}?id=${userID}`, { credentials: 'include' });
    const data: RecipeResponseData = await respose.json();
    
    setIsLoading(false);
    if(respose.ok && !('error' in data)) {
      setRecipe(data);
    }
    else if('error' in data) {
      setError(data);
    }
  }

  return { fetchRecipe, isLoading, recipe, error };
}

export default useFetchRecipe;
