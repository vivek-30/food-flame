import { useState, useEffect } from 'react';

import Recipe from '../components/Recipe';
import EmptyData from '../components/EmptyData';

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:4000/recipes/');
      const data = await response.json();

      if(response.ok) {
        setRecipes(data);
      } else {
        console.log(data.error);
        alert(data.message);
      }
    })();
  }, []);

  return (
    <div className="main-content">
      {
        recipes.length !== 0
        ? recipes.map((recipe) => <Recipe key={recipe._id} recipeObject={recipe} />)
        : <EmptyData />
      }
    </div>
  );
}

export default Home;
