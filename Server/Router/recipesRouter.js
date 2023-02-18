const express = require('express');
const router = express.Router();

// Controllers for managing CRUD operations for recipes.
const {
  getAllRecipes,
  getSpecificRecipe,
  addNewRecipe,
  updateOneRecipe,
  removeOneRecipe
} = require('../Controllers/recipesController');

// Middlewares.
const authenticateUser = require('../Middlewares/authenticateUser');

// Applying Middlewares.
router.use(authenticateUser);

// Handling all GET requests.
router.get('/', getAllRecipes);
router.get('/:id', getSpecificRecipe);

// Handling all POST requests.
router.post('/add-recipe', addNewRecipe);

// Handling all UPDATE requests.
router.put('/:id', updateOneRecipe);

// Handling all DELETE requests.
router.delete('/:id', removeOneRecipe);

module.exports = router;
