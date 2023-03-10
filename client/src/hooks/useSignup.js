import { useState } from 'react';
import { SIGNUP_URI } from '../utils/URIs';

const useSignup = () => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signupUser = async (signupCredentials) => {
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
    const data = await response.json();

    setIsLoading(false);
    if(response.ok) {
      setInfo(data.message);
    } else {
      setError(data.error);
    }
  }

  return { signupUser, isLoading, info, error };
}

export default useSignup;
