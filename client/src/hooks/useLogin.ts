import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LOGIN_URI } from '../constants/URIs';

import { login } from '../redux/slices/authSlice';
import { LogInResponseData } from '../types/index.types';
import { ILogInCredentials } from '../types/index.interfaces';

const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const loginUser = async (loginCredentials: ILogInCredentials) => {
    setIsLoading(true);
    const response = await fetch(LOGIN_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginCredentials),
      credentials: 'include'
    });
    const data: LogInResponseData = await response.json();

    setIsLoading(false);
    if(response.ok && !data.error) {
      dispatch(login(data._id));
      localStorage.setItem('user', JSON.stringify(data._id));
    } else {
      const errorMessage = data.error || 'Unknown error occured during login process.';
      setError(errorMessage);
    }
  }

  return { loginUser, isLoading, error };
}

export default useLogin;
