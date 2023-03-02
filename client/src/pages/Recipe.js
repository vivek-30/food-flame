import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import M from 'materialize-css';

// Components.
import NoData from '../components/NoData';
import LoadingSpinner from '../components/LoadingSpinner';
import RecipeSteps from '../components/RecipePage/RecipeSteps';
import RecipeUpdateBox from '../components/RecipePage/RecipeUpdateBox';

// Utility Stuff.
import customAlert from '../utils/customAlert';
import { RECIPE_BASE_URI } from '../utils/URIs';

const Recipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const recipeImageRef = useRef();
  const { recipeID } = useParams();
  const { state: authState } = useAuthContext();

  const { user: userID } = authState;

  useEffect(() => {
    (async () => {
      const response = await fetch(`${RECIPE_BASE_URI}/${recipeID}?id=${userID}`, { credentials: 'include' });
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
  }, [recipeID, userID]);

  return (
    <>
    {
      isLoading ? <LoadingSpinner /> : (
        <section className="container row pos-relative" id="recipe-page">
          {
            !recipe ? <NoData /> :
            <>
              <RecipeUpdateBox recipeID={recipe._id} />
              <div className="col s12 m5 l5 white img-box z-depth-2">
                <img 
                  ref={recipeImageRef}
                  className="materialboxed col m5 l5 s12 recipe-image full-width" 
                  src={recipe.imageSRC} 
                  alt="Recipe" 
                />
              </div>
              <div className="col s12 m6 l6 push-m1 push-l1">
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
      )
    }
    </>
  );
}

export default Recipe;
