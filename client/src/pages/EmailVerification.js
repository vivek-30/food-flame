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
        error !== null && <div className="email-verify-container">
          <img src={AppLogo} alt="app-logo" className="pos-absolute top-left-center" />
          <p className="flow-text blue-grey-text text-darken-3 pos-absolute top-left-center">
            {error}
            <div>
              <em className="flow-text">Go Back To: </em>
              <Link to="/log-in" className="btn green darken-3">Login Page</Link>
              <Link to="/sign-up" className="btn cyan darken-3">Signup Page</Link>
            </div>
          </p>
        </div>
      }
    </div>
  );
}

export default EmailVerification;
