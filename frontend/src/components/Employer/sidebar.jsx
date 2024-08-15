import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faList, faMagnifyingGlass, faPlus, faUsers, faCog, faDoorOpen } from '@fortawesome/free-solid-svg-icons';


function EmployerSidebar({ sidebarCollapse, sidebarHandler }) {

  return (
    <div className={`dashboard_sidebar ${sidebarCollapse ? 'collapsed_sidebar' : ''}`}>
      <ul>
        <li className='sidebar_logo'>
          <NavLink>
            <h2>Talenthunt</h2>
            <div className='sidebar_icon' onClick={sidebarHandler}><FontAwesomeIcon icon={faBars} /></div>
          </NavLink></li>
        <li>
          <NavLink exact activeclassname='is-active' to='/employer/dashboard'>
            <div className='sidebar_icon'><FontAwesomeIcon icon={faList} /></div>
            <span>Dashboard</span>
          </NavLink></li>
        <li><NavLink exact activeclassname='is-active' to='/employer/JobsPosted'>
          <div className='sidebar_icon'><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
          <span>Job Postings</span>
        </NavLink></li>
        <li><NavLink exact activeclassname='is-active' to='/employer/addJob'>
          <div className='sidebar_icon'><FontAwesomeIcon icon={faPlus} /></div>
          <span>Add new job</span>
        </NavLink></li>
        <li><NavLink exact activeclassname='is-active' to='/emplpoyer/candidatesList'>
          <div className='sidebar_icon'><FontAwesomeIcon icon={faUsers} /></div>
          <span>Candidates</span>
        </NavLink></li>
        <li><NavLink exact activeclassname='is-active' to='/employer/Profile'>
          <div className='sidebar_icon'><FontAwesomeIcon icon={faCog} /></div>
          <span>Profile</span>
        </NavLink></li>
        <li><NavLink exact activeclassname='is-active' to='/employer/employerLogout'>
          <div className='sidebar_icon'><FontAwesomeIcon icon={faDoorOpen} /></div>
          <span>Logout</span>
        </NavLink></li>
      </ul>
    </div>
  )
}

export default EmployerSidebar