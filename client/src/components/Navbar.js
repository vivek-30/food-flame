import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="blue-grey white">
      <div className="nav-wrapper container">
        <Link to="/" className="brand-logo black-text">
          <i className="material-icons">local_dining</i>
          Recipes
        </Link>
        <ul id="nav-mobile" className="right hide-on-small-only">
          <li><Link to="/sign-up" className="blue-grey-text">Sign Up</Link></li>
          <li><Link to="/log-in" className="blue-grey-text">Log In</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
