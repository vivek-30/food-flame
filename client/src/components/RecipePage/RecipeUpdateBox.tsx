import React, { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import removeRecipe from '../../redux/thunks/removeRecipe';

// Utility Stuff.
import customAlert from '../../utils/customAlert';
import { getError, getStatus } from '../../redux/slices/recipeSlice';
import { ReduxDispatch } from '../../redux/store';

interface IRecipeUpdateBoxProps {
  recipeID: string
}

const RecipeUpdateBox = ({ recipeID }: IRecipeUpdateBoxProps) => {
  const [isRequestPending, setIsRequestPending] = useState<boolean>(false);
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();

  const status = useSelector(getStatus);
  const error = useSelector(getError);

  const navigateBackward = (): void => {
    navigate('/');
  }

  const handleRemoveRecipe = async (): Promise<void> => {
    // Check whether a DELETE request is already made or not.
    if(isRequestPending) return;
    else setIsRequestPending(true);

    dispatch(removeRecipe(recipeID));
    if(status === 'failure') {
      const errorMessage = error || 'Unknown Error Occured during fetching of recipes.';
      customAlert(errorMessage);
    }
    
    if(status === 'success') {
      navigate('/');
    }
  }

  const updateRecipe = (): void => {
    const params = createSearchParams({ updating: 'true', id: recipeID });
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
          onClick={handleRemoveRecipe}
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
