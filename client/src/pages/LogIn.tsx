import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';
import { ILogInCredentials } from '../types/index.interfaces';

const emptyCredentials = {
  email: '',
  password: ''
};
const LogIn = () => {
  const [credentials, setCredentials] = useState<ILogInCredentials>(emptyCredentials);
  const { loginUser, isLoading, error } = useLogin();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setCredentials((currentCredentials) => ({ ...currentCredentials, [id]: value }));
  }

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await loginUser(credentials);
  }

  return (
    <div className="container auth-container">
      <div className="container">
        <h4 className="center-align">Log In</h4>
        <form onSubmit={handleLogin}>
          <div className="input-field">
            <i className="material-icons prefix">email</i>
            <input
              id="email"
              type="email"
              autoComplete="off"
              spellCheck="false"
              value={credentials.email}
              onChange={handleInputChange}
            />
            <label htmlFor="email">Enter Your Email</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">vpn_key</i>
            <input
              id="password"
              type="password"
              autoComplete="off"
              spellCheck="false"
              value={credentials.password}
              onChange={handleInputChange}
            />
            <label htmlFor="password">Enter Your Password</label>
          </div>
          {error !== null && <div className="info-box red-border red red-text lighten-5 text-darken-3"><p>{error}</p></div>}
          <div className="center-align">
            <button disabled={isLoading} className="btn teal darken-1" type="submit">
              Log In
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
