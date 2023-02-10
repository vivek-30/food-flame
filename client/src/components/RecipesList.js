import { useState, useEffect } from 'react';

import RecipeCard from './RecipeCard';
import SearchRecipe from './SearchRecipe';
import AddRecipeCard from './AddRecipeCard';

const RecipesList = ({ recipes, setRecipes }) => {
  const [recipesToDisplay, setRecipesToDisplay] = useState(recipes);

  useEffect(() => {
    setRecipesToDisplay(recipes);
  }, [recipes]);

  return (
    <>
      <SearchRecipe 
        recipes={recipes}
        setRecipesToDisplay={setRecipesToDisplay} 
      />
      {
        recipesToDisplay.map((recipe) => (
          <RecipeCard key={recipe._id} recipeObject={recipe} setRecipes={setRecipes} />
        ))
      }
      <AddRecipeCard />
    </>
  );
}

export default RecipesList;
