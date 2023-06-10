import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Context Providers.
import AuthContextProvider from './context/AuthContext';
import RecipeContextProvider from './context/RecipeContext';

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <AuthContextProvider>
    <RecipeContextProvider>
      <App />
    </RecipeContextProvider>
  </AuthContextProvider>
);
