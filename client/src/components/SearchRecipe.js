import { useState } from 'react';

const SearchRecipe = ({ recipes, setRecipesToDisplay }) => {

  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  }

  // Search "Query" Inside Name And Ingredients Of A Recipe.
  const hasQueryString = (name, ingredients, refinedQuery) => {
    if(name.toLowerCase().indexOf(refinedQuery) !== -1) return true;

    let foundQuery = false;
    for(let index = 0; index < ingredients.length; index++) {
      if(ingredients[index].toLowerCase().indexOf(refinedQuery) !== -1) {
        foundQuery = true;
        break;
      }
    }

    return foundQuery;
  }

  const searchRecipe = () => {
    const refinedQuery = query.trim().toLowerCase();
    if(refinedQuery === '') {
      setRecipesToDisplay(recipes);
      return;
    }

    const searchedResults = [];

    recipes.forEach((recipe) => {
      if(hasQueryString(recipe.name, recipe.ingredients, refinedQuery)) {
        searchedResults.push(recipe);
      }
    });

    setRecipesToDisplay(searchedResults);
  }

  return (
    <div className="search-recipe-box col s12 m12 l12">
      <div className="input-field col s12 m4 l4 push-m8 push-l10">
        <i className="material-icons prefix">search</i>
        <input 
          type="search" 
          id="recipe-search" 
          autoComplete="off" 
          spellCheck="false" 
          placeholder="Search Recipe..."
          onKeyUp={searchRecipe}
          onChange={handleInputChange}
          value={query}
        />
      </div>
    </div>
  );
}

export default SearchRecipe;
