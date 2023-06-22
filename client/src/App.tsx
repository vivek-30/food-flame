import React from 'react';
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter,
} from 'react-router-dom';

// Components.
import Navbar from './components/Navbar';

// Pages.
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Recipe from './pages/Recipe';
import AddRecipe from './pages/AddRecipe';
import EmailVerification from './pages/EmailVerification';

// Redux stuff.
import { useSelector } from 'react-redux';
import { getUser } from './redux/slices/authSlice';

const App = () => {
  const user = useSelector(getUser);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/log-in" />} />
          <Route path="/add-recipe" element={user ? <AddRecipe /> : <Navigate to="/log-in" />} />
          <Route path="/log-in" element={!user ? <LogIn /> : <Navigate to="/" />} />
          <Route path="/sign-up" element={!user ? <SignUp /> : <Navigate to="/" />} />
          <Route path="/verify" element={!user ? <EmailVerification /> : <Navigate to="/" />} />
          <Route path="/:recipeID" element={user ? <Recipe /> : <Navigate to="/log-in" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
