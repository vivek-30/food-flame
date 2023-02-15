import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Context Providers.
import RecipeContextProvider from './context/RecipeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecipeContextProvider>
      <App />
    </RecipeContextProvider>
  </React.StrictMode>
);
