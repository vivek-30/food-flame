import { useState } from 'react';
import useLogin from '../hooks/useLogin';

const emptyCredentials = {
  email: '',
  password: ''
};
const LogIn = () => {
  const [credentials, setCredentials] = useState(emptyCredentials);
  const { loginUser, isLoading, error } = useLogin();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCredentials((currentCredentials) => ({ ...currentCredentials, [id]: value }));
  }

  const handleLogin = async (e) => {
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
          {error !== null && <div className="error-box red lighten-5 red-text text-darken-3"><p>{error}</p></div>}
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
