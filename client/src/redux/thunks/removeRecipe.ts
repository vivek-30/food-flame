import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReduxDispatch, ReduxStore } from '../store';
import { RECIPE_BASE_URI } from '../../constants/URIs';
import { IRecipe } from '../../types/index.interfaces';
import { RecipeErrorResonse, RecipeResponseData } from '../../types/index.types';

const removeRecipe = createAsyncThunk<
  // Return type of the payload creator
  RecipeResponseData,
  // First argument to the payload creator
  string,
  // Types for ThunkAPI
  {
    state: ReduxStore,
    dispatch: ReduxDispatch,
    rejectValue: RecipeErrorResonse
  }
>(
  'recipe/removeRecipe',
  async (recipeID, thunkApi) => {
    const state: ReduxStore = thunkApi.getState();
    const response = await fetch(`${RECIPE_BASE_URI}/${recipeID}?id=${state.auth.user}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const data: RecipeResponseData = await response.json();
    if(!response.ok && ('error' in data)) {
      return thunkApi.rejectWithValue(data);
    }
    
    return (data as IRecipe);
  }
);

export default removeRecipe;
