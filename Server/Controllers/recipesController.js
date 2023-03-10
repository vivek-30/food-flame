const Recipes = require('../Models/recipeModel');

const getAllRecipes = async (req, res) => {
  const { id: userID } = req.query;
  try {
    const recipes = await Recipes.find({ userID }).sort({ name: 'asc' });
    res.status(200).json(recipes);
  } catch(error) {
    res.status(500).json({ message: 'Internal Server Error.', error: error.message });
  }
}

const getSpecificRecipe = async (req, res) => {
  const { id: userID } = req.query;
  const { id: recipeID } = req.params;

  try {
    const recipe = await Recipes.findOne({ _id: recipeID, userID });
    if(recipe === null) {
      res.status(404).json({ message: 'No Recipe Found!!!' });
    } else {
      res.status(200).json(recipe);
    }
  } catch(error) {
    res.status(500).json({ message: 'Internal Server Error.', error: error.message });
  }
}

const addNewRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.create(req.body);
    res.status(200).json(recipe);
  } catch(error) {
    res.status(500).json({ message: 'Unable To Add Recipe.', error: error.message });
  }
}

const updateOneRecipe = async (req, res) => {
  const { id: userID } = req.query;
  const { id: recipeID } = req.params;

  try {
    const outdatedRecipe = await Recipes.findOneAndUpdate({ _id: recipeID, userID }, req.body);
    const updatedRecipe = await Recipes.findById(recipeID);
    res.status(200).json(updatedRecipe);
  } catch(error) {
    res.status(500).json({ message: 'Unable To Update Recipe.', error: error.message });
  }
}

const removeOneRecipe = async (req, res) => {
  const { id: userID } = req.query;
  const { id: recipeID } = req.params;

  try {
    const recipe = await Recipes.findOneAndDelete({ _id: recipeID, userID });
    if(recipe === null) {
      res.status(404).json({ message: 'Recipe No Longer Exists!!!' });
    } else {
      res.status(200).json(recipe);
    }
  } catch(error) {
    res.status(500).json({ message: 'Error Removing Recipe!!!', error: error.message });
  } 
}

// This method is useful for pagination purposes.
const getLimitedRecipes = async (req, res) => {
  const { quantity } = req.params;
  try {
    const recipes = await Recipes.find({}).limit(quantity).sort({ createdAt: 'desc' });
    res.status(200).json(recipes);
  } catch(error) {
    res.status(500).json({ message: 'Internal Server Error.', error: error.message });
  }
}

module.exports = {
  getAllRecipes,
  getSpecificRecipe,
  addNewRecipe, 
  updateOneRecipe, 
  removeOneRecipe
};
