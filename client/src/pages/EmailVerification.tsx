import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import AppLogo from '../assets/FoodFlame-logo.png';
import LoadingSpinner from '../components/LoadingSpinner';
import useEmailVerification from '../hooks/useEmailVerification';

const EmailVerification = () => {
  const { verifyEmail, isLoading, error } = useEmailVerification();
  const [searchParams] = useSearchParams();
  const _token: string | null = searchParams.get('_token');

  useEffect(() => {
    (async () => {
      await verifyEmail(_token);
    })();

    // eslint-disable-next-line
  }, []);

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
