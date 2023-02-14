import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { emptyRecipe, initialCookingStep } from '../pages/AddRecipe';
import M from 'materialize-css';

const RecipeToolBar = ({ setRecipeData, setCookingSteps, manageRecipe }) => {
  const floatingActionButtonRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      M.FloatingActionButton.init(floatingActionButtonRef.current, { hoverEnabled: false });
    }, 1000);
  }, []);

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
    <div ref={floatingActionButtonRef} className="fixed-action-btn">
      <button onClick={(e) => e.preventDefault()} className="btn-floating btn-large teal darken-1">
        <i className="large material-icons">menu</i>
      </button>
      <ul>
        <li>
          <button onClick={addNewCookingStep} className="btn-floating teal darken-1">
            <i className="material-icons">add</i>
          </button>
        </li>
        <li>
          <button onClick={navigateBackward} className="btn-floating teal darken-1">
            <i className="material-icons">arrow_back</i>
          </button>
        </li>
        <li>
          <button onClick={clearAllInputFields} className="btn-floating teal darken-1">
            <i className="material-icons">delete_sweep</i>
          </button>
        </li>
        <li>
          <button onClick={manageRecipe} className="btn-floating teal darken-1">
            <i className="material-icons">save</i>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default RecipeToolBar;
