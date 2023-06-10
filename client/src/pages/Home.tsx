import React, { useState, useEffect } from 'react';
import useAuthContext from '../hooks/useAuthContext';
import useRecipeContext from '../hooks/useRecipeContext';

// Components.
import NoData from '../components/NoData';
import Recipes from '../components/HomePage/Recipes';
import AddRecipeCard from '../components/HomePage/AddRecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';

// Utility Stuff.
import customAlert from '../utils/customAlert';
import { RECIPE_BASE_URI } from '../../constants/URIs';
import { IRecipesResponseData } from '../types/index.interfaces';

const Home = () => {
  const { state: authState } = useAuthContext()
  const { state, dispatch } = useRecipeContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { user: userID } = authState;

  useEffect(() => {
    (async () => {
      const response = await fetch(`${RECIPE_BASE_URI}?id=${userID}`, { credentials: 'include' });
      const data: IRecipesResponseData = await response.json();

      setIsLoading(false);    

      if(response.ok && !data.error) {
        dispatch({ type: 'SET_RECIPES', payload: data.data });
      } else {
        const { message, error } = data.error!;
        customAlert(message);
        console.log(`Error Occured While Fetching Recipes ${error}`);
      }
    })();
  }, [dispatch, userID]);

  return (
    <>
    {
      isLoading ? <LoadingSpinner /> : (
        <main className="recipes-list-container container pos-relative">
          <div className="row">
          { 
            state.recipes.length > 0 ? <Recipes /> : (
              <div>
                <AddRecipeCard />
                <NoData />
              </div>
            )
          }
          </div>
        </main>
      )
    }
    </>
  );
}

export default Home;
