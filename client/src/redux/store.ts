import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import recipeReducer from './slices/recipeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    recipe: recipeReducer
  }
});

export type ReduxStore = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;

export default store;
