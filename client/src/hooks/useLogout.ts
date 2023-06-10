import { useState } from 'react';
import { LOGOUT_URI } from '../../constants/URIs';
import useAuthContext from './useAuthContext';
import useRecipeContext from './useRecipeContext';

import { LogOutResponseData } from '../types/index.types';

const useLogout = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: recipeDispatch } = useRecipeContext();

  const logoutUser = async () => {
    setIsLoading(true);
    const response = await fetch(LOGOUT_URI, { credentials: 'include' });
    const data: LogOutResponseData = await response.json();

    setIsLoading(false);
    if(!response.ok && data.error) {
      setError(data.error);
      return;
    }

    authDispatch({ type: 'LOGOUT', payload: null });
    recipeDispatch({ type: 'SET_RECIPES', payload: [] });
    localStorage.removeItem('user');
  }

  return { logoutUser, isLoading, error };
}

export default useLogout;
