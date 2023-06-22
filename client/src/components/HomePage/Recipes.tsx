import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getRecipes } from '../../redux/slices/recipeSlice';

// Components.
import RecipeCard from './RecipeCard';
import RecipeSearchBox from './RecipeSearchBox';
import AddRecipeCard from './AddRecipeCard';

import { IRecipe } from '../../types/index.interfaces';

const Recipes = () => {
  const recipes = useSelector(getRecipes);
  const [recipesToDisplay, setRecipesToDisplay] = useState<IRecipe[]>(recipes);
  
  useEffect(() => {
    setRecipesToDisplay(recipes);
  }, [recipes]);

  return (
    <>
      <RecipeSearchBox setRecipesToDisplay={setRecipesToDisplay} />
      {recipesToDisplay.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
      <AddRecipeCard />
    </>
  );
}

export default Recipes;
