import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

const Navbar = () => {
  const sideNavRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      M.Sidenav.init(sideNavRef.current, {
        preventScrolling: false
      });
    }, 1000);
  },  []);
  
  return (
    <>
      <nav className="blue-grey white">
        <span className="sidenav-trigger white cursor-ptr" data-target="slide-out">
          <i className="material-icons blue-grey-text text-darken-2">menu</i>
        </span>
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo blue-grey-text text-darken-2">
            <i className="material-icons blue-grey-text text-darken-2 hide-on-small-only">local_dining</i>
            FoodFlame
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/sign-up" className="blue-grey-text text-darken-2">Sign Up</Link></li>
            <li><Link to="/log-in" className="blue-grey-text text-darken-2">Log In</Link></li>
          </ul>
        </div>
      </nav>
      <ul ref={sideNavRef} id="slide-out" className="sidenav blue-grey lighten-5">
        <li><div className="user-view flow-text blue-grey-text text-darken-2">FoodFlame</div></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/sign-up">Sign Up</Link></li>
        <li><Link to="/log-in">Log In</Link></li>
      </ul>
    </>
  );
}

export default Navbar;
