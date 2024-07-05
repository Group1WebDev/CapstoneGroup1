import React from 'react';
import { NavLink } from 'react-router-dom';
import "./header.css"

function header() {
  return (
    <header className="mainHead">
      <div className='container mainHead'>
        <h2>Talent Hunt</h2>
        <nav>
          <ul>
            <li>
              <NavLink exact activeclassname='is-active' to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink activeclassname='is-active' to='/login'>Sign In</NavLink>
            </li>
            <li>
              <NavLink activeclassname='is-active' to='/contactUs'>Contact Us</NavLink>
            </li>
            <li>
              <NavLink activeclassname='is-active' to='/aboutUs'>About Us</NavLink>
            </li>
            <li>
              <button className='register_button'>Employer</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default header