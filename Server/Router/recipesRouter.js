const express = require('express');
const router = express.Router();

// Controllers For Managing CRUD Operations For Recipes.
const {
  getAllRecipes,
  getSpecificRecipe,
  addNewRecipe,
  updateOneRecipe,
  removeOneRecipe
} = require('../Controllers/recipesController');

// Handling All GET Requests.
router.get('/', getAllRecipes);
router.get('/:id', getSpecificRecipe);

// Handling All POST Requests.
router.post('/add-recipe', addNewRecipe);

// Handling All UPDATE Requests.
router.put('/:id', updateOneRecipe);

// Handling All DELETE Requests.
router.delete('/:id', removeOneRecipe);

module.exports = router;
