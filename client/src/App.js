import {
  Route,
  Routes,
  Navigate,
  BrowserRouter,
} from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';

// Components.
import Navbar from './components/Navbar';

// Pages.
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Recipe from './pages/Recipe';
import AddRecipe from './pages/AddRecipe';
import EmailVerification from './pages/EmailVerification';

const App = () => {
  const { state } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={state.user ? <Home /> : <Navigate to="/log-in" />} />
          <Route path="/add-recipe" element={state.user ? <AddRecipe /> : <Navigate to="/log-in" />} />
          <Route path="/log-in" element={!state.user ? <LogIn /> : <Navigate to="/" />} />
          <Route path="/sign-up" element={!state.user ? <SignUp /> : <Navigate to="/" />} />
          <Route path="/verify" element={!state.user ? <EmailVerification /> : <Navigate to="/" />} />
          <Route path="/:recipeID" element={state.user ? <Recipe /> : <Navigate to="/log-in" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
