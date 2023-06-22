import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT_URI } from '../constants/URIs';

import { logout } from '../redux/slices/authSlice';
import { setRecipeStateToDefault } from '../redux/slices/recipeSlice';
import { LogOutResponseData } from '../types/index.types';

const useLogout = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const logoutUser = async () => {
    setIsLoading(true);
    const response = await fetch(LOGOUT_URI, { credentials: 'include' });
    const data: LogOutResponseData = await response.json();

    setIsLoading(false);
    if(!response.ok && data.error) {
      setError(data.error);
      return;
    }

    dispatch(logout(null));
    dispatch(setRecipeStateToDefault());
    localStorage.removeItem('user');
  }

  return { logoutUser, isLoading, error };
}

export default useLogout;
