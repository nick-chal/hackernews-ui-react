import React from 'react';
import { NavLink } from 'react-router-dom';

import ROUTES from '../constants/routes';

/**
 * The component for the navbar.
 */
const Navbar = () => (
  <>
    <div className="header">
      <h2>HackerNews</h2>
      <p>Hackernews api using react</p>
    </div>
    <ul className="navbar">
      <li>
        <NavLink exact to={ROUTES.BEST}>
          Best
        </NavLink>
      </li>
      <li>
        <NavLink exact to={ROUTES.TOP}>
          Top
        </NavLink>
      </li>
      <li>
        <NavLink exact to={ROUTES.NEW}>
          New
        </NavLink>
      </li>
    </ul>
  </>
);

export default Navbar;
