import { createContext, useEffect, useReducer } from 'react';

// Reducers.
import authReducer from '../reducers/authReducer';

// Context and state.
export const AuthContext = createContext(null);
const initialState = {
  user: null
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if(user) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
