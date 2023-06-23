import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore } from '../store';

// Redux thunks
import setRecipes from '../thunks/setRecipes';
import addRecipe from '../thunks/addRecipe';
import updateRecipe from '../thunks/updateRecipe';
import removeRecipe from '../thunks/removeRecipe';

import { IRecipe } from '../../types/index.interfaces';
import { RecipeErrorResonse } from '../../types/index.types';

interface IRecipeState {
  recipes: IRecipe[],
  status: 'idle' | 'loading' | 'success' | 'failure',
  error: string | null
}

const initialState: IRecipeState = {
  recipes: [],
  status: 'idle',
  error: null
}

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    setRecipeStateToDefault: (state: IRecipeState, action: PayloadAction<void>): IRecipeState => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    // Fetch all recipes
    builder
    .addCase(setRecipes.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(setRecipes.fulfilled, (state, action) => {
      state.status = 'success';
      const allRecipes = (action.payload as IRecipe[]);
      state.recipes = allRecipes;
    })
    .addCase(setRecipes.rejected, (state, action) => {
      state.status = 'failure';
      state.error = (action.payload as RecipeErrorResonse).message; 
    });

    // Add a new recipe
    builder
    .addCase(addRecipe.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(addRecipe.fulfilled, (state, action) => {
      state.status = 'success';
      const newRecipe = (action.payload as IRecipe);
      state.recipes.push(newRecipe);
    })
    .addCase(addRecipe.rejected, (state, action) => {
      state.status = 'failure';
      state.error = (action.payload as RecipeErrorResonse).message; 
    });

    // Update existing recipe
    builder
    .addCase(updateRecipe.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(updateRecipe.fulfilled, (state, action) => {
      state.status = 'success';
      const updatedRecipe = (action.payload as IRecipe);
      state.recipes = state.recipes.map(recipe => {
        if(recipe._id === updatedRecipe._id) return updatedRecipe;
        return recipe;
      });
    })
    .addCase(updateRecipe.rejected, (state, action) => {
      state.status = 'failure';
      state.error = (action.payload as RecipeErrorResonse).message; 
    });

    // Delete a recipe
    builder
    .addCase(removeRecipe.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(removeRecipe.fulfilled, (state, action) => {
      state.status = 'success';
      const removedRecipe = (action.payload as IRecipe);
      state.recipes = state.recipes.filter(recipe => recipe._id !== removedRecipe._id);
    })
    .addCase(removeRecipe.rejected, (state, action) => {
      state.status = 'failure';
      state.error = (action.payload as RecipeErrorResonse).message; 
    });
  }
});

export const getRecipes = (state: ReduxStore) => state.recipe.recipes;
export const getStatus = (state: ReduxStore) => state.recipe.status;
export const getError = (state: ReduxStore) => state.recipe.error;

export const { setRecipeStateToDefault } = recipeSlice.actions;
export default recipeSlice.reducer;
