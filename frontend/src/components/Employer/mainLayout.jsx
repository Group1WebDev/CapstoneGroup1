import React, { useState, useEffect } from 'react';
import EmployerSidebar from './sidebar';
import Nav from '../Header/Header';
import './EmployerDashboard/employeeDash.css';

const EmployerParent = ({ children }) => {
  const [sidebarCollapse, setSidebarCollapse] = useState(window.innerWidth <= 768);

  const sidebarHandler = () => {
    setSidebarCollapse(!sidebarCollapse);
  };

  useEffect(() => {
    const adjustSidebar = () => {
      if (window.innerWidth < 768 && !sidebarCollapse) {
        setSidebarCollapse(true);
      } else if (window.innerWidth >= 768 && sidebarCollapse) {
        setSidebarCollapse(false);
      }
    };

    window.addEventListener('resize', adjustSidebar);

    return () => window.removeEventListener('resize', adjustSidebar);
  }, [sidebarCollapse]);

  return (
    <div className='dashboard_parent'>
      <Nav />
      <EmployerSidebar sidebarCollapse={sidebarCollapse} sidebarHandler={sidebarHandler} />
      <div className={`content_zone ${sidebarCollapse ? 'collapsed_content' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default EmployerParent;