import React, { useState } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import { createSearchParams, useNavigate } from 'react-router-dom';

// Utility Stuff.
import customAlert from '../../utils/customAlert';
import { RECIPE_BASE_URI } from '../../../constants/URIs';
import { IRecipeResponseData } from '../../types/index.interfaces';

interface PropType {
  recipeID: string
}

const RecipeUpdateBox = ({ recipeID }: PropType) => {
  const [isRequestPending, setIsRequestPending] = useState<boolean>(false);
  const { state: authState } = useAuthContext();
  const navigate = useNavigate();

  const { user: userID } = authState;

  const navigateBackward = (): void => {
    navigate('/');
  }

  const removeRecipe = async (): Promise<void> => {
    // Check whether a DELETE request is already made or not.
    if(isRequestPending) return;
    else setIsRequestPending(true);

    const response = await fetch(`${RECIPE_BASE_URI}/${recipeID}?id=${userID}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const data: IRecipeResponseData = await response.json();

    if(response.ok && !data.error) {
      navigate('/');
    } else {
      const { message, error } = data.error!;
      customAlert(message);
      console.log(`Error Occured While Deleting A Recipes ${error}`);
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
