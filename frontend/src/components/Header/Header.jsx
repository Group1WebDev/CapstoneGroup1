import React, { useState, useEffect } from 'react';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './header.css';
import { useAuth } from '../../useToken';

function Header() {
  const { token, removeToken, userInfo } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    removeToken()
    setIsLoggedIn(false)
    window.sessionStorage.removeItem('userInfo');
    navigate('/')
  };

  useEffect(() => {
    const storageUserInfo = window.sessionStorage.getItem('userInfo');
    const storageToken = storageUserInfo ? JSON.parse(storageUserInfo).token : null;
    setIsLoggedIn(storageToken !== null && storageToken !== '');
  }, [token]);
  useEffect(() => {
  }, [location.pathname, userInfo]);

  const isUserLogged = userInfo?.role === 'user';
  const isEmployerLogged = userInfo?.role === 'employer';

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

            {isLoggedIn && isUserLogged && (
              <>
                <li>
                  <NavLink activeclassname='is-active' to='/jobList'>
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
              </>
            )}
            {isLoggedIn && isEmployerLogged && (
              <li>
                <NavLink exact activeclassname='is-active' to='/employer/dashboard'>
                  Dashboard
                </NavLink>
              </li>
            )}

            {!isLoggedIn && (
              <>
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
              </>
            )}

            {isLoggedIn ? (
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
