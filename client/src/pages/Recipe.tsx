import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/slices/authSlice';
import { useParams } from 'react-router-dom';
import M from 'materialize-css';

// Components.
import NoData from '../components/NoData';
import LoadingSpinner from '../components/LoadingSpinner';
import RecipeSteps from '../components/RecipePage/RecipeSteps';
import RecipeUpdateBox from '../components/RecipePage/RecipeUpdateBox';

import customAlert from '../utils/customAlert';
import useFetchRecipe from '../hooks/useFetchRecipe';

const Recipe = () => {
  const { fetchRecipe, isLoading, recipe, error } = useFetchRecipe();
  const recipeImageRef = useRef<HTMLImageElement | null>(null);
  const { recipeID } = useParams();
  const userID = useSelector(getUser);

  useEffect(() => {
    (async () => {
      await fetchRecipe(userID, recipeID);
    })();

    if(error) {
      customAlert(error.message);
      console.log(`Error occured while fetching a recipe ${error.error}`);
    }

    setTimeout(() => {
      M.Materialbox.init(recipeImageRef.current!);
    }, 1000);

    // eslint-disable-next-line
  }, []);

  return (
    <>
    {
      isLoading ? <LoadingSpinner /> : (
        <section className="container row pos-relative" id="recipe-page">
          {
            recipe === null ? <NoData /> :
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
