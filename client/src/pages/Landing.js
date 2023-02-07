import { Link } from 'react-router-dom';

// Images and icons.
import CookingGIF from '../assets/cooking.gif';
import DishIcon from '../assets/dish-icon.svg';

const Landing = () => {
  return (
    <main className="container row landing-page-container">
      <div className="col s5 m5 l5 landing-text-box">
        <div>
          <h3 className="landing-title">Recipes</h3>
          <img src={DishIcon} alt="Dish icon" className="landing-dish-icon" />
        </div>
        <p className="flow-text">
          Find IT,<br />
          Check IT,<br />
          Taste IT !!!
        </p>
        <Link to="/home" className="round-large-btn btn-large blue-grey darken-2">
          Explore
          <i className="material-icons right">arrow_forward</i>
        </Link>
      </div>
      <div className="col s7 m7 l7 landing-img-box">
        <img src={CookingGIF} alt="Cooking GIF" />
      </div>
    </main>
  );
}

export default Landing;
