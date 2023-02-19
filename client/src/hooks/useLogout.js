import { useState } from 'react';
import useAuthContext from './useAuthContext';
import useRecipeContext from './useRecipeContext';

const useLogout = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: recipeDispatch } = useRecipeContext();

  const logoutUser = async () => {
    setIsLoading(true);
    const response = await fetch('http://localhost:4000/user/log-out', { credentials: 'include' });
    const data = await response.json();

    setIsLoading(false);
    if(!response.ok) {
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
