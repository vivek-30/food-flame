import { Link } from 'react-router-dom';
import useRecipeContext from '../../hooks/useRecipeContext';
import customAlert from '../../utils/customAlert';

const RecipeCard = ({ recipe }) => {
  const { dispatch } = useRecipeContext();
  const { name, description, imageSRC, _id: recipeID } = recipe;

  const removeRecipe = async () => {
    const response = await fetch(`http://localhost:4000/recipes/${recipeID}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const data = await response.json();

    if(response.ok) {
      dispatch({ type: 'REMOVE_RECIPE', payload: data });
    } else {
      const { message, error } = data;
      customAlert(message);
      console.log(`Error Occured While Deleting A Recipes ${error}`);
    }
  }

  return (
    <div className="card recipe-card stick-action col s12 m5 l3">
      <div className="card-image waves-effect waves-block waves-light">
        <img className="activator recipe-img full-width" src={imageSRC} alt={name} />
      </div>
      <div className="card-content pos-relative">
        <strong className="card-title truncate grey-text text-darken-4 left full-width">
          {name}
          <i className="material-icons pos-absolute" onClick={removeRecipe}>delete</i>
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
