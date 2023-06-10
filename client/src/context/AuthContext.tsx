import { createContext, useEffect, useReducer } from 'react';

import authReducer from '../reducers/authReducer';
import { IAuthContext, IAuthContextProp } from '../types/index.interfaces';
import { AuthContextState } from '../types/index.types';

// Context and state.
export const AuthContext = createContext<IAuthContext | null>(null);
const initialState: AuthContextState = {
  user: null
};

const AuthContextProvider = ({ children }: IAuthContextProp) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user: string | null = localStorage.getItem('user');
    if(user !== null) {
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
