import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import useAuthContext from '../hooks/useAuthContext';

import customAlert from '../utils/customAlert';
import AppLogo from '../assets/FoodFlame-logo.png';

const Navbar = () => {
  const { state } = useAuthContext();
  const { logoutUser, isLoading, error } = useLogout();

  const handleUserLogout = async (): Promise<void> => {
    await logoutUser();
    if(error !== null) {
      customAlert(error);
    }
  }
  
  return (
    <nav className="blue-grey white">
      <div className="nav-wrapper container">
        <Link to="/">
          <img src={AppLogo} alt="Logo" id="app-logo" />
        </Link>
        <Link to="/" className="brand-logo hide-on-small-only blue-grey-text text-darken-2">
          FoodFlame
        </Link>
        <ul id="nav-mobile" className="right">
          {
            state.user ? 
              <li>
                <button 
                  disabled={isLoading}
                  onClick={handleUserLogout}
                  className="auth-btn cursor-ptr blue-grey-text text-darken-2">
                    Log Out
                </button>
              </li> :
              <>
                <li><Link to="/sign-up" className="blue-grey-text text-darken-2">Sign Up</Link></li>
                <li><Link to="/log-in" className="blue-grey-text text-darken-2">Log In</Link></li>
              </>
          }
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
