const Recipes = require('../Models/recipeModel');
let recipeList = require('../Data/defaultRecipesList.json');

const addDefaultData = async (userID) => {
  // Attach userID field with each recipe in the list.
  recipeList = recipeList.map(recipe => ({ ...recipe, userID }));

  try {
    const recipes = await Recipes.insertMany(recipeList);
    if(!recipes) {
      console.log('Error in adding recipes.');
    }
  }
  catch(error) {
    console.log('Error in adding recipes.');
  }
};

module.exports = addDefaultData;
