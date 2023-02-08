import { useNavigate } from 'react-router-dom';

import Recipe from './Recipe';
import SearchRecipe from './SearchRecipe';

const RecipesList = ({ recipes, setRecipes}) => {

  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate('/add-recipe');
  }

  return (
    <>
      <SearchRecipe />
      {
        recipes.map((recipe) => (
          <Recipe key={recipe._id} recipeObject={recipe} setRecipes={setRecipes} />
        ))
      }
      <div id="add-recipe-card" className="card recipe-card col s12 m5 l3" onClick={handleCardClick}>
        <i className="material-icons medium center blue-grey-text text-darken-2">add_circle</i>
        <h5 className="card-title truncate blue-grey-text text-darken-2 left">
          Add Recipe
        </h5>
      </div>
    </>
  );
}

export default RecipesList;
