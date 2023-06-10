import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { IAuthContext } from '../types/index.interfaces';

const useAuthContext = (): IAuthContext => {
  const context = useContext<IAuthContext | null>(AuthContext);
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
