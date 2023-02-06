import { Link } from 'react-router-dom';

const Recipe = ({ recipeObject, setRecipes }) => {
  const { name, description, imageSRC, _id: recipeID } = recipeObject;

  const updateState = (state) => {
    return state.filter(recipe => recipe.id !== recipeID);
  }

  const removeRecipe = async () => {
    const response = await fetch(`http://localhost:4000/recipes/${recipeID}`, { method: 'DELETE' });
    const data = await response.json();
    console.log(`recipe ID: ${recipeID}`);
    if(response.ok) {
      setRecipes(updateState);
    } else {
      let { message, error } = data;
      alert(message);
      console.log(`Error Occured While Fetching Recipes ${error}`);
    }
  }

  return (
    <div className="card recipe-card stick-action col s12 m5 l3">
      <div className="card-image waves-effect waves-block waves-light">
        <img className="activator" src={imageSRC} alt={name} />
      </div>
      <div className="card-content">
        <strong className="card-title truncate grey-text text-darken-4 left">
          {name}
          <i className="material-icons" onClick={removeRecipe}>delete</i>
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

export default Recipe;
