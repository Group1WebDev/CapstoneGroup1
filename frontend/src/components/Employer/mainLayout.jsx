import React, { useState } from 'react';
import EmployerSidebar from './sidebar';
import Nav from '../Header/Header';
import './EmployerDashboard/employeeDash.css';

const EmployerParent = ({ children }) => {
  const [sidebarCollapse, setSidebarCollapse] = useState(false);

  const sidebarHandler = () => {
    setSidebarCollapse(!sidebarCollapse);
  };

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