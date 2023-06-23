import React, { useEffect } from 'react';
import { ReduxDispatch } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import setRecipes from '../redux/thunks/setRecipes';
import {
  getStatus,
  getError,
  getRecipes
} from '../redux/slices/recipeSlice';

// Components.
import NoData from '../components/NoData';
import Recipes from '../components/HomePage/Recipes';
import AddRecipeCard from '../components/HomePage/AddRecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';

// Utility Stuff.
import customAlert from '../utils/customAlert';

const Home = () => {
  const dispatch = useDispatch<ReduxDispatch>();
  const recipes = useSelector(getRecipes);
  const status = useSelector(getStatus);
  const error = useSelector(getError);

  useEffect(() => {
    if(status === 'idle') {
      dispatch(setRecipes());
    }
    
    if(status === 'failure') {
      const errorMessage = error || 'Unknown Error Occured during fetching of recipes.';
      customAlert(errorMessage);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {status === 'loading' ? <LoadingSpinner /> : (
        <main className="recipes-list-container container pos-relative">
          <div className="row">
            {recipes.length > 0 ? <Recipes /> : (
              <div>
                <AddRecipeCard />
                <NoData />
              </div>
            )}
          </div>
        </main>
      )}
    </>
  );
}

export default Home;
