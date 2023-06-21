import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { VERIFY_EMAIL_URI } from '../constants/URIs';

import { login } from '../redux/slices/authSlice';
import { LogInResponseData } from '../types/index.types';

const useEmailVerification = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const verifyEmail = async (_token: string | null) => {
    setIsLoading(true);
    const response = await fetch(`${VERIFY_EMAIL_URI}?_token=${_token}`, { credentials: 'include' });
    const data: LogInResponseData = await response.json();

    setIsLoading(false);
    if(response.ok && !data.error) {
      dispatch(login(data._id));
      localStorage.setItem('user', JSON.stringify(data._id));
    }
    else {
      const errorMessage = data.error || 'Unknown error occured during email verification process.';
      setError(errorMessage);
    } 
  }

  return { verifyEmail, isLoading, error };
}

export default useEmailVerification;
