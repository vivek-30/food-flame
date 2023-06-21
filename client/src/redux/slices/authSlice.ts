import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore } from '../store';

interface IAuthState {
  user: string | null
}

// Check if a user already logged in or not.
let existingUser = localStorage.getItem('user');
if(existingUser) {
  existingUser = JSON.parse(existingUser);
}

const initialState: IAuthState = {
  user: existingUser
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: IAuthState, action: PayloadAction<(string | null)>): void => {
      state.user = action.payload
    },
    logout: (state: IAuthState, action: PayloadAction<(string | null)>): void => {
      state.user = null;
    }
  }
});

export const { login, logout } = authSlice.actions; 
export const getUser = (state: ReduxStore) => state.auth.user;

export default authSlice.reducer;
