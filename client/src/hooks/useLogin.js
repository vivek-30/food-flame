import { useState } from 'react';
import useAuthContext from './useAuthContext';

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const loginUser = async (loginCredentials) => {
    setIsLoading(true);
    const response = await fetch('http://localhost:4000/user/log-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginCredentials),
      credentials: 'include'
    });
    const data = await response.json();

    setIsLoading(false);
    if(response.ok) {
      dispatch({ type: 'LOGIN', payload: data });
      localStorage.setItem('user', JSON.stringify(data._id));
    } else {
      setError(data.error);
    }
  }

  return { loginUser, isLoading, error };
}

export default useLogin;
