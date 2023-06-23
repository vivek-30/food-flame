import { useState } from 'react';
import { SIGNUP_URI } from '../constants/URIs';

import { SignUpResponseData } from '../types/index.types';
import { ISignUpCredentials } from '../types/index.interfaces';

const useSignup = () => {
  const [info, setInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signupUser = async (signupCredentials: ISignUpCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setInfo(null);
    
    const response = await fetch(SIGNUP_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupCredentials),
      credentials: 'include'
    });
    const data: SignUpResponseData = await response.json();

    setIsLoading(false);
    if(response.ok && data.message) {
      setInfo(data.message);
    }
    else {
      const errorMessage = data.error || 'Unknown error occured during signup process.';
      setError(errorMessage);
    }
  }

  return { signupUser, isLoading, info, error };
}

export default useSignup;
