import { useState, useEffect } from 'react';
import useRecipeContext from '../hooks/useRecipeContext';

// Components.
import EmptyData from '../components/EmptyData';
import RecipesList from '../components/RecipesList';
import AddRecipeCard from '../components/AddRecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';

// Controllers.
import customAlert from '../controllers/CustomAlert';

const Home = () => {
  const [state, dispatch] = useRecipeContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:4000/recipes/');
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
    <main className="recipes-list-container container">
      <div className="row">
      {
        isLoading ? <LoadingSpinner /> : 
        state.recipes.length !== 0 ? <RecipesList /> : 
        <>
          <AddRecipeCard />
          <EmptyData />
        </>
      }
      </div>
    </main>
  );
}

export default Home;
