import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components.
import Navbar from './components/Navbar';
import Authentication from './components/Authentication';

// Pages.
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import AddRecipe from './pages/AddRecipe';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
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
