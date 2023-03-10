import { useState, useEffect } from 'react';
import useRecipeContext from '../../hooks/useRecipeContext';

// Components.
import RecipeCard from './RecipeCard';
import RecipeSearchBox from './RecipeSearchBox';
import AddRecipeCard from './AddRecipeCard';

const Recipes = () => {
  const { state }= useRecipeContext();
  const [recipesToDisplay, setRecipesToDisplay] = useState(state.recipes);
  
  useEffect(() => {
    setRecipesToDisplay(state.recipes);
  }, [state.recipes]);

  return (
    <>
      <RecipeSearchBox setRecipesToDisplay={setRecipesToDisplay} />
      {
        recipesToDisplay.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))
      }
      <AddRecipeCard />
    </>
  );
}

export default Recipes;
