import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

const Navbar = () => {
  const sideNavRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      M.Sidenav.init(sideNavRef.current);
    }, 1000);
  },  []);
  
  return (
    <>
      <nav className="blue-grey white">
        <span className="sidenav-trigger white valign-wrapper" data-target="slide-out">
          <i className="material-icons black-text">menu</i>
        </span>
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo black-text">
            <i className="material-icons hide-on-small-only">local_dining</i>
            FoodFlame
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/sign-up" className="blue-grey-text text-darken-1">Sign Up</Link></li>
            <li><Link to="/log-in" className="blue-grey-text text-darken-1">Log In</Link></li>
          </ul>
        </div>
      </nav>
      <ul ref={sideNavRef} id="slide-out" className="sidenav blue-grey lighten-5">
        <li><div className="user-view flow-text">FoodFlame</div></li>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/sign-up">Sign Up</Link></li>
        <li><Link to="/log-in">Log In</Link></li>
      </ul>
    </>
  );
}

export default Navbar;
