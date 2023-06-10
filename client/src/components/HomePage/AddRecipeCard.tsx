import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

const AddRecipeCard = () => {
  const navigate = useNavigate();
  
  const handleCardClick = (): void => {
    const params = createSearchParams({ updating: 'false', id: 'null' });
    navigate(`/add-recipe?${params}`);
  }

  return (
    <div id="add-recipe-card" className="card recipe-card col s12 m5 l3 cursor-ptr" onClick={handleCardClick}>
      <i className="material-icons medium center blue-grey-text text-darken-2">add_circle</i>
      <h5 className="card-title truncate blue-grey-text text-darken-2 left">
        Add Recipe
      </h5>
    </div>
  );
}

export default AddRecipeCard;
