import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReduxDispatch, ReduxStore } from '../store';
import { RECIPE_BASE_URI } from '../../constants/URIs';
import { IRecipe } from '../../types/index.interfaces';
import { RecipeErrorResonse, RecipeResponseData } from '../../types/index.types';

const updateRecipe = createAsyncThunk<
  // Return type of the payload creator
  RecipeResponseData,
  // First argument to the payload creator
  IRecipe,
  // Types for ThunkAPI
  {
    state: ReduxStore,
    dispatch: ReduxDispatch,
    rejectValue: RecipeErrorResonse
  }
>(
  'recipe/updateRecipe',
  async (recipe, thunkApi) => {
    const state: ReduxStore = thunkApi.getState();
    const response = await fetch(`${RECIPE_BASE_URI}/${recipe._id}?id=${state.auth.user}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe),
      credentials: 'include'
    });
    const data: RecipeResponseData = await response.json();
    if(!response.ok && ('error' in data)) {
      return thunkApi.rejectWithValue(data);
    }
    
    return (data as IRecipe);
  }
);

export default updateRecipe;
