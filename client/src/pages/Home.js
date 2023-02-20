import { useState, useEffect } from 'react';
import useRecipeContext from '../hooks/useRecipeContext';

// Components.
import NoData from '../components/NoData';
import Recipes from '../components/HomePage/Recipes';
import AddRecipeCard from '../components/HomePage/AddRecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';

// Utility Stuff.
import customAlert from '../utils/customAlert';
import { RECIPE_BASE_URI } from '../utils/URIs';

const Home = () => {
  const { state, dispatch } = useRecipeContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch(RECIPE_BASE_URI, { credentials: 'include' });
      const data = await response.json();

      setIsLoading(false);    

      if(response.ok) {
        dispatch({ type: 'SET_RECIPES', payload: data });
      } else {
        const { message, error } = data;
        customAlert(message);
        console.log(`Error Occured While Fetching Recipes ${error}`);
      }
    })();
  }, [dispatch]);

  return (
    <main className="recipes-list-container container pos-relative">
      <div className="row">
      {
        isLoading ? <LoadingSpinner /> : 
        state.recipes.length !== 0 ? <Recipes /> : 
        <>
          <AddRecipeCard />
          <NoData />
        </>
      }
      </div>
    </main>
  );
}

export default Home;
