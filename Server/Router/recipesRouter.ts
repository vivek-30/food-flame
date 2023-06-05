import { Router } from 'express';

// Controllers for managing CRUD operations for recipes.
import {
  getAllRecipes,
  getSpecificRecipe,
  addNewRecipe,
  updateOneRecipe,
  removeOneRecipe
} from '../Controllers/recipesController';

// Initialising express router.
const router = Router();

// Middlewares.
import authenticateUser from '../Middlewares/authenticateUser';

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

export default router;
