import React, { useState, useEffect } from 'react';

import { NavLink, useLocation } from 'react-router-dom';
import './header.css';
import { useAuth } from '../../useToken';

function Header() {
  const { token, setToken, removeToken, userInfo } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const logout = () => removeToken();

  useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    setIsLoggedIn(token !== null && token !== '');
  }, [isLoggedIn]);
  useEffect(() => {
    console.log('Current path:', location.pathname);
    console.log('User role:', userInfo?.role);
  }, [location.pathname, userInfo]);

  const whichUser = userInfo?.role === 'employer';
  const whichPath = location.pathname === '/dashboard';
  console.log('whichPart');
  return (
    <header className='mainHead'>
      
      {/* condition: if path is not dashboard then different class name */}
      <div className={(!whichPath) ? 'container mainHead' : 'container mainHead centerHead'}>
        <h2>Talent Hunt</h2>

        {(!whichPath) && (
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
        )}
      </div>
    </header>
  );
}

export default Header;
