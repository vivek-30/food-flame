import React, { useState, Dispatch, SetStateAction } from 'react';
import useRecipeContext from '../../hooks/useRecipeContext';

import { IRecipe } from '../../types/index.interfaces'; 

interface IRecipeSearchBoxProps {
  setRecipesToDisplay: Dispatch<SetStateAction<IRecipe[]>>
}

const RecipeSearchBox = ({ setRecipesToDisplay }: IRecipeSearchBoxProps) => {
  const [query, setQuery] = useState<string>('');
  const { state } = useRecipeContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  }

  // Search "Query" Inside Name And Ingredients Of A Recipe.
  const hasQueryString = (name: string, ingredients: string[], refinedQuery: string): boolean => {
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

  const searchRecipe = (): void => {
    const refinedQuery = query.trim().toLowerCase();
    if(refinedQuery === '') {
      setRecipesToDisplay(state.recipes);
      return;
    }

    const searchedResults: IRecipe[] = [];

    state.recipes.forEach((recipe) => {
      if(hasQueryString(recipe.name, recipe.ingredients, refinedQuery)) {
        searchedResults.push(recipe);
      }
    });

    setRecipesToDisplay(searchedResults);
  }

  return (
    <div id="recipe-search-box" className="col s12 m12 l12">
      <div className="input-field col s12 m4 l4 push-m8 push-l10">
        <i className="material-icons prefix">search</i>
        <input 
          type="search" 
          id="recipe-search-input" 
          className="text-center"
          value={query}
          onKeyUp={searchRecipe}
          onChange={handleInputChange}
          autoComplete="off" 
          spellCheck="false" 
          placeholder="Search Recipe..."
        />
      </div>
    </div>
  );
}

export default RecipeSearchBox;
