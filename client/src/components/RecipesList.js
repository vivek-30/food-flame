import { useState, useEffect } from 'react';
import useRecipeContext from '../hooks/useRecipeContext';

// Components.
import RecipeCard from './RecipeCard';
import SearchRecipe from './SearchRecipe';
import AddRecipeCard from './AddRecipeCard';

const RecipesList = () => {
  const [state] = useRecipeContext();
  const [recipesToDisplay, setRecipesToDisplay] = useState(state.recipes);
  useEffect(() => {
    setRecipesToDisplay(state.recipes);
  }, [state.recipes]);

  return (
    <>
      <SearchRecipe setRecipesToDisplay={setRecipesToDisplay} />
      {
        recipesToDisplay.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))
      }
      <AddRecipeCard />
    </>
  );
}

export default RecipesList;
