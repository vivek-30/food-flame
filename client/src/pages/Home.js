import { useState, useEffect } from 'react';

import EmptyData from '../components/EmptyData';
import LoadingSpinner from '../components/LoadingSpinner';
import RecipesList from '../components/RecipesList';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:4000/recipes/');
      const data = await response.json();

      setIsLoading(false);    
      if(response.ok) {
        setRecipes(data);
      } else {
        let { message, error } = data;
        alert(message);
        console.log(`Error Occured While Fetching Recipes ${error}`);
      }
    })();
  }, [recipes]);

  return (
    <main className="recipes-list-container container">
      <div className="row">
      {
        isLoading ? <LoadingSpinner /> : 
        recipes.length ? <RecipesList recipes={recipes} setRecipes={setRecipes} /> : 
        <EmptyData />
      }
      </div>
    </main>
  );
}

export default Home;
