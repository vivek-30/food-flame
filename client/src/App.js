import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import M from 'materialize-css';

// Components.
import Navbar from './components/Navbar';
import Authentication from './components/Authentication';

// Pages.
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import Landing from './pages/Landing';
import AddRecipe from './pages/AddRecipe';

const App = () => {
  
  useEffect(() => {
    setTimeout(() => {
      M.AutoInit();
    }, 1000);
  }, []);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/sign-up" element={<Authentication title="Sign Up" />} />
          <Route path="/log-in" element={<Authentication title="Log In" />} />
          <Route path="/:recipeID" element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
