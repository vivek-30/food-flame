import { useState, useEffect } from 'react';

import Recipe from '../components/Recipe';
import EmptyData from '../components/EmptyData';
import Loading from '../components/Loading';

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
        console.log(data.error);
        alert(data.message);
      }
    })();
  }, []);

  return (
    <main className="recipes-list-container container">
      <div className="row">
      {
        isLoading ? <Loading /> : recipes.length !== 0
        ? recipes.map((recipe) => <Recipe key={recipe._id} recipeObject={recipe} />)
        : <EmptyData />
      }
      </div>
    </main>
  );
}

export default Home;
