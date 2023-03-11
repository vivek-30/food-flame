import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Context Providers.
import AuthContextProvider from './context/AuthContext';
import RecipeContextProvider from './context/RecipeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <RecipeContextProvider>
      <App />
    </RecipeContextProvider>
  </AuthContextProvider>
);
