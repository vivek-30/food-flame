import { useState } from 'react';
import useSignup from '../hooks/useSignup';
import customAlert from '../utils/customAlert';

const emptyCredentials = {
  username: '',
  email: '',
  password: ''
};
const SignUp = () => {
  const [credentials, setCredentials] = useState(emptyCredentials);
  const { signupUser, isLoading, error } = useSignup();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCredentials((currentCredentials) => ({ ...currentCredentials, [id]: value }));
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    await signupUser(credentials);
    if(error) {
      customAlert(error);
    } else {
      setCredentials(emptyCredentials);
    }
  }

  return (
    <div className="container auth-container">
      <div className="container">
        <h4 className="center-align">Sign Up</h4>
        <form onSubmit={handleSignup}>
          <div className="input-field">
            <i className="material-icons prefix">account_circle</i>
            <input 
              id="username"
              type="text"
              autoComplete="off"
              spellCheck="false"
              value={credentials.username}
              onChange={handleInputChange}
            />
            <label htmlFor="username">Enter Your UserName</label>
          </div>
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
          <div className="center-align">
            <button disabled={isLoading} className="btn teal darken-1" type="submit">
              Sign Up
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
