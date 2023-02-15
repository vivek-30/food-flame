const recipeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RECIPES': {
      const updatedState = {
        recipes: action.payload 
      };
      return updatedState;
    } 
    
    case 'ADD_RECIPE': {
      const updatedState = {
        recipes: [ ...state.recipes, action.payload ] 
      };
      return updatedState;
    }

    case 'UPDATE_RECIPE': {
      const updatedState = {
        recipes: state.recipes.map((recipe) => {
          if(recipe._id === action.payload._id) {
            return action.payload;
          }
          return recipe;
        })
      };
      return updatedState;
    }
    
    case 'REMOVE_RECIPE': {
      const updatedState = {
        recipes: state.recipes.filter((recipe) => recipe._id !== action.payload._id)
      }
      return updatedState;
    }

    default: {
      return state;
    }
  }
}

export default recipeReducer;
