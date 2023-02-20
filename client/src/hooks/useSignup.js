import { useState } from 'react';
import { SIGNUP_URI } from '../utils/URIs';
import useAuthContext from './useAuthContext';

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signupUser = async (signupCredentials) => {
    setIsLoading(true);
    const response = await fetch(SIGNUP_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupCredentials),
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

  return { signupUser, isLoading, error };
}

export default useSignup;
