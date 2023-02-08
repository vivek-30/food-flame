import { useState } from 'react';

const SearchRecipe = () => {

  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <div className="search-recipe-box col s12 m10 l11">
      <div className="input-field col s12 m8 l8">
        <i className="material-icons prefix">search</i>
        <input 
          type="search" 
          id="recipe-search" 
          autoComplete="off" 
          spellCheck="false" 
          placeholder="Search Recipe..."
          onChange={handleInputChange}
          value={query}
        />
      </div>
    </div>
  )
}

export default SearchRecipe;
