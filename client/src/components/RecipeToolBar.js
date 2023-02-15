import { useNavigate } from 'react-router-dom';
import { emptyRecipe, initialCookingStep } from '../pages/AddRecipe';

const RecipeToolBar = ({ setRecipeData, setCookingSteps, manageRecipe }) => {
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
    navigate('/');
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
          className="material-icons small blue-grey-text text-darken-2 z-depth-1">
          arrow_back
        </i>
        <i 
          onClick={addNewCookingStep}
          className="material-icons small blue-grey-text text-darken-2 z-depth-1">
          add
        </i>
        <i 
          onClick={clearAllInputFields}
          className="material-icons small blue-grey-text text-darken-2 z-depth-1">
          delete_sweep
        </i>
        <i 
          onClick={manageRecipe}
          className="material-icons small blue-grey-text text-darken-2 z-depth-1">
          save
        </i>
      </div>
    </div>
  );
}

export default RecipeToolBar;
