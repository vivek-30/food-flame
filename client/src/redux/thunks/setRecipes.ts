import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReduxStore, ReduxDispatch } from '../store';
import { RECIPE_BASE_URI } from '../../constants/URIs';
import { IRecipe } from '../../types/index.interfaces';
import { RecipeErrorResonse, RecipesResponseData } from '../../types/index.types';

const setRecipes = createAsyncThunk<
  // Return type of the payload creator
  RecipesResponseData,
  // First argument to the payload creator
  void,
  // Types for ThunkAPI
  {
    state: ReduxStore,
    dispatch: ReduxDispatch,
    rejectValue: RecipeErrorResonse
  }
>(
  'recipe/setRecipes',
  async (_, thunkApi) => {
    const state: ReduxStore = thunkApi.getState();
    // state.recipe.status = 'idle';
    const response = await fetch(`${RECIPE_BASE_URI}?id=${state.auth.user}`, {
      credentials: 'include'
    });
    const data: RecipesResponseData = await response.json();
    if(!response.ok && ('error' in data)) {
      return thunkApi.rejectWithValue(data);
    }
    
    return (data as IRecipe[]);
  }
);

export default setRecipes;
