import { createAsyncThunk } from '@reduxjs/toolkit';
import { ADD_RECIPE_URI } from '../../constants/URIs';

import { IRecipe } from '../../types/index.interfaces';
import {
  RecipeDetailsForDB,
  RecipeErrorResonse,
  RecipeResponseData
} from '../../types/index.types';

const addRecipe = createAsyncThunk<
  // Return type of the payload creator
  RecipeResponseData,
  // First argument to the payload creator
  RecipeDetailsForDB,
  // Types for ThunkAPI
  {
    rejectValue: RecipeErrorResonse
  }
>(
  'recipe/addRecipe',
  async (recipe, thunkApi) => {
    const response = await fetch(ADD_RECIPE_URI, {
      method: 'POST',
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

export default addRecipe;
