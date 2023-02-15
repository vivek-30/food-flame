import { useNavigate } from 'react-router-dom';
import { emptyRecipe, initialCookingStep } from '../pages/AddRecipe';

const RecipeToolBar = ({ isUpdating, setRecipeData, setCookingSteps, manageRecipe }) => {
  const navigate = useNavigate();

  // Toolbar Handlers.
  const addNewCookingStep = (e) => {
    e.preventDefault();
    setCookingSteps((currentSteps) => (
      [ ...currentSteps, { index: currentSteps.length, content: ''}]
    ));
  }

  const navigateBackward = (e) => {
    e.preventDefault();
    navigate('/home');
  }

  const clearAllInputFields = (e) => {
    e.preventDefault();
    setRecipeData(emptyRecipe);
    setCookingSteps(initialCookingStep);
  }

  return (
    <div className="col s12 m12 l12" id="recipe-toolbar">
      <div className="col s12 m10 l10 push-s1 push-m3 push-l4">
        <i 
          onClick={navigateBackward}
          data-position="top"
          data-tooltip="Go Back"
          className="material-icons tooltipped small blue-grey-text text-darken-2 z-depth-1">
          arrow_back
        </i>
        <i 
          onClick={addNewCookingStep}
          data-position="top"
          data-tooltip="Add Cooking Step"
          className="material-icons tooltipped small blue-grey-text text-darken-2 z-depth-1">
          add
        </i>
        <i 
          onClick={clearAllInputFields}
          data-position="top"
          data-tooltip="Clear Everthing"
          className="material-icons tooltipped small blue-grey-text text-darken-2 z-depth-1">
          delete_sweep
        </i>
        <i 
          onClick={manageRecipe}
          data-position="top"
          data-tooltip={`${isUpdating === 'true' ? 'Update' : 'Save'} Recipe`}
          className="material-icons tooltipped small blue-grey-text text-darken-2 z-depth-1">
          save
        </i>
      </div>
    </div>
  );
}

export default RecipeToolBar;
