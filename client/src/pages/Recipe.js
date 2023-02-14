import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import M from 'materialize-css';

// Components.
import EmptyData from '../components/EmptyData';
import RecipeSteps from '../components/RecipeSteps';
import LoadingSpinner from '../components/LoadingSpinner';
import RecipeUpdateBox from '../components/RecipeUpdateBox';

// Controllers.
import customAlert from '../controllers/CustomAlert';

const Recipe = () => {

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const recipeImageRef = useRef();
  const { recipeID } = useParams();

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:4000/recipes/${recipeID}`);
      const data = await response.json();

      setIsLoading(false);
      if(response.ok) {
        setRecipe(data);
      } else {
        const { message, error } = data;
        customAlert(message);
        console.log(`Error Occured While Fetching A Recipe ${error}`);
      }
    })();

    setTimeout(() => {
      M.Materialbox.init(recipeImageRef.current);
    }, 1000);
  }, [recipeID]);

  return (
    <section className="container row" id="recipe-page">
      {
        isLoading ? <LoadingSpinner /> :
        !recipe ? <EmptyData /> : <>
          <RecipeUpdateBox recipeID={recipe._id} />
          <div className="col s12 m5 l5 white img-box z-depth-2">
            <img 
              ref={recipeImageRef}
              className="materialboxed col m5 l5 s12 recipe-image" 
              src={recipe.imageSRC} 
              alt="Recipe" 
            />
          </div>
          <div className="col s12 m6 l6 push-s1 push-m1 push-l1">
            <h2 className="blue-grey-text text-darken-2">{recipe.name}</h2>
            <p className="grey-text text-darken-2" id="recipe-description">{recipe.description}</p>
            <div id="ingredients-box">
              {
                recipe.ingredients.map((ingredient, index) => (
                <span key={index} className="ingredient z-depth-1">{ingredient}</span>
                ))
              }
            </div>
          </div>
          <RecipeSteps steps={recipe.cookingSteps} />
        </>
      }
    </section>
  );
}

export default Recipe;
