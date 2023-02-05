import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components.
import Navbar from './components/Navbar';
import Authentication from './components/Authentication';

// Pages.
import Home from './pages/Home';
import Landing from './pages/Landing';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing /> } />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-up" element={<Authentication title="Sign Up" />} />
          <Route path="/log-in" element={<Authentication title="Log In" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
