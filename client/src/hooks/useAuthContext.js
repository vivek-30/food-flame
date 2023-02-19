import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuthContext = () => {
  const context = useContext(AuthContext);
  const contextScopeError = new Error('useAuthContext Hook Must Be Used WithIn AuthContext.Provider Component.');

  if(context === null) {
    throw contextScopeError;
  }

  return {
    state: context.state,
    dispatch: context.dispatch
  };
}

export default useAuthContext;
