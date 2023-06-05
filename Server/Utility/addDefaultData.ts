import { ObjectId } from 'mongoose';
import Recipes from '../Models/recipeModel';
import recipeList from '../Data/defaultRecipesList.json';

const addDefaultData = async (userID: ObjectId): Promise<void> => {
  // Attach userID field with each recipe in the list.
  const updatedRecipeList = recipeList.map(recipe => ({ ...recipe, userID }));

  try {
    const recipes = await Recipes.insertMany(updatedRecipeList);
    if(!recipes) {
      console.log('Error in adding recipes.');
    }
  }
  catch(error) {
    console.log('Error in adding recipes.');
  }
};

export default addDefaultData;
