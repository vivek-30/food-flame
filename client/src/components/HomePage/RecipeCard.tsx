import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import removeRecipe from '../../redux/thunks/removeRecipe';

// Utility Stuff.
import customAlert from '../../utils/customAlert';
import { IRecipe } from '../../types/index.interfaces';
import { ReduxDispatch } from '../../redux/store';
import { getError, getStatus } from '../../redux/slices/recipeSlice';

interface IRecipeCardProps {
  recipe: IRecipe
}

const RecipeCard = ({ recipe }: IRecipeCardProps) => {
  const [isRequestPending, setIsRequestPending] = useState<boolean>(false);
  const dispatch = useDispatch<ReduxDispatch>();
  
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const { name, description, imageSRC, _id: recipeID } = recipe;

  const handleRemoveRecipe = async (): Promise<void> => {
    // Check whether a DELETE request is already made or not.
    if(isRequestPending) return;
    else setIsRequestPending(true);

    dispatch(removeRecipe(recipeID));
    if(status === 'failure') {
      const errorMessage = error || 'Unknown Error Occured during fetching of recipes.';
      customAlert(errorMessage);
    }
  }

  return (
    <div className="card recipe-card stick-action col s12 m5 l3">
      <div className="card-image">
        <img className="activator recipe-img full-width" src={imageSRC} alt={name} />
      </div>
      <div className="card-content pos-relative">
        <strong className="card-title truncate grey-text text-darken-4 left full-width">
          {name}
          <i className="material-icons pos-absolute" onClick={handleRemoveRecipe}>delete</i>
        </strong>
      </div>
      <div className="card-reveal grey lighten-4">
        <h2 className="card-title grey-text text-darken-4">
          {name}
          <i className="material-icons right">close</i>
        </h2>
        <p>{description}</p>
      </div>
      <div className="card-action">
        <Link to={`/${recipeID}`} className="blue-grey-text text-darken-1">Read Recipe</Link>
      </div>
    </div>
  );
}

export default RecipeCard;
