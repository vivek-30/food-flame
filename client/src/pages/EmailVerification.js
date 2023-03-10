import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

import { VERIFY_EMAIL_URI } from '../utils/URIs';
import AppLogo from '../assets/FoodFlame-logo.png';

import LoadingSpinner from '../components/LoadingSpinner';

const EmailVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [searchParams] = useSearchParams();
  const { dispatch } = useAuthContext();

  const _token = searchParams.get('_token');

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await fetch(`${VERIFY_EMAIL_URI}?_token=${_token}`, { credentials: 'include' });
      const data = await response.json();
      setIsLoading(false);
      if(response.ok) {
        dispatch({ type: 'LOGIN', payload:data._id });
        localStorage.setItem('user', JSON.stringify(data._id));
      } else {
        setError(data.error);
      }
      
    })();
  }, [dispatch, _token]);

  return (
    <div>
      {
        isLoading ? <LoadingSpinner /> :
        error !== null && <div className="pos-relative email-verify-conatiner">
          <img src={AppLogo} alt="app-logo" className="pos-absolute" />
          <p className="pos-absolute">
            {error}
            <strong>Go Back To: </strong>
            <Link to="/log-in" className="btn">Login Page</Link>
            <Link to="/sign-up" className="btn">Signup Page</Link>
          </p>
        </div>
      }
    </div>
  );
}

export default EmailVerification;
