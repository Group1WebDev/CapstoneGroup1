import React, { useState, useEffect } from 'react';

import { NavLink } from 'react-router-dom';
import './header.css';
import { useAuth } from '../../useToken';

function Header() {
  const { token, setToken, removeToken, userInfo } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => removeToken();

  useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    setIsLoggedIn(token !== null && token !== '');
  }, [isLoggedIn]);
  return (
    <header className='mainHead'>
      <div className='container mainHead'>
        <h2>Talent Hunt</h2>
        <nav>
          <ul>
            <li>
              <NavLink exact activeclassname='is-active' to='/'>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink activeclassname='is-active' to='/job-list'>
                Job List
              </NavLink>
            </li>
            <li>
              <NavLink activeclassname='is-active' to='/contactUs'>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink activeclassname='is-active' to='/aboutUs'>
                About Us
              </NavLink>
            </li>
            {token ? (
              <button className='register_button' onClick={logout}>
                Logout
              </button>
            ) : (
              <li>
                <NavLink activeclassname='is-active' to='/login'>
                  Sign In
                </NavLink>
              </li>
            )}

            {/* <li>
              <button className='register_button'>Employer</button>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
