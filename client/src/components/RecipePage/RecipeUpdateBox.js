import { createSearchParams, useNavigate } from 'react-router-dom';

// Utility Stuff.
import customAlert from '../../utils/customAlert';
import { RECIPE_BASE_URI } from '../../utils/URIs';

const RecipeUpdateBox = ({ recipeID }) => {
  const navigate = useNavigate();

  const navigateBackward = () => {
    navigate('/');
  }

  const removeRecipe = async () => {
    const response = await fetch(`${RECIPE_BASE_URI}/${recipeID}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const data = await response.json();

    if(response.ok) {
      navigate('/');
    } else {
      const { message, error } = data;
      customAlert(message);
      console.log(`Error Occured While Deleting A Recipes ${error}`);
    }
  }

  const updateRecipe = () => {
    const params = createSearchParams({ updating: true, id: recipeID });
    navigate(`/add-recipe?${params}`);
  }

  return (
    <div className="col s10 m10 l10" id="recipe-update-box">
      <div className="col s12 m12 l12">
        <i 
          onClick={navigateBackward}
          className="material-icons small blue-grey-text text-darken-2 z-depth-1">
          arrow_back
        </i>
        <i 
          onClick={removeRecipe}
          className="material-icons small blue-grey-text text-darken-2 z-depth-1">
          delete
        </i>
        <i 
          onClick={updateRecipe}
          className="material-icons small blue-grey-text text-darken-2 z-depth-1">
          edit
        </i>
      </div>
    </div>
  );
}

export default RecipeUpdateBox;
