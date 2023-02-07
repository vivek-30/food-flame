import { useState, useEffect } from 'react';

import Recipe from '../components/Recipe';
import EmptyData from '../components/EmptyData';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDiasbled] = useState(false);

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
        isLoading ? <LoadingSpinner /> : recipes.length !== 0
        ? recipes.map((recipe) => <Recipe key={recipe._id} recipeObject={recipe} setRecipes={setRecipes} />)
        : <EmptyData />
      }
      </div>
      {
        !isLoading && recipes.length && (
          <button className={`btn-large center blue darken-2 round-large-btn col s12 m12 l12 ${isDisabled ? 'disabled' : ''}`}>
            Show More
            <i className="material-icons right">arrow_downward</i>
          </button>
        )
      }
    </main>
  );
}

export default Home;
