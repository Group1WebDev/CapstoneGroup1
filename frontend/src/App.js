import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import JobList from './components/JobList/jobList';
import Nav from './components/Header/Header';
import Footer from './components/Footer/footer';
import Homepage from './components/Homepage/homepage';
import AboutUs from './components/AboutUs/AboutUs';
import EmployeeDash from './components/Employer/EmployerDashboard/employeeDash';
import AddNewJob from './components/Employer/Add_job/addJob';
import ContactUs from './components/ContactUs/contactUs';
import EmployerParent from './components/Employer/mainLayout';
import JobDescription from './components/JobDescription/jobDescription'

import './App.css';
import'./responsive.css';

import { AuthProvider, useAuth } from './useToken';
import EmployerProfile from './components/Employer/EmployerProfile/employerProfile';
import ProfilePage from './components/Profile/profilePage';
import ForgotPasswordScreen from './components/ForgotPassword/forgotPassword';

const Layout = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    const body = document.querySelector('#root');
    body.scrollIntoView(
      {
        behavior: 'smooth',
      },
      500
    );
  });

  return (
    <section>
      <Nav />
      {children}
      {!location.pathname.includes('employer') && <Footer />}
    </section>
  );
};

// TODO:
// const AdminLayout = ({ children }) => {
//   const { token, userInfo } = useAuth();

//   useEffect(() => {
//     if (!token || !userInfo || !userInfo.userType) {
//       return (window.location.href = '/login');
//     }
//   }, [token, userInfo]);

//   return (
//     <div>
//       <div className='content-padder content-background'>{children}</div>
//     </div>
//   );
// };

function Home() {
  return (
    <div>
      <BrowserRouter>
        <RouteMain />
      </BrowserRouter>
    </div>
  );
}

function RouteMain() {
  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <Homepage />
            </Layout>
          }
        />
        <Route
          path='/login'
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path='/signup'
          element={
            <Layout>
              <Signup />
            </Layout>
          }
        />
        <Route
          path='/forgotPassword'
          element={
            <Layout>
              <ForgotPasswordScreen />
            </Layout>
          }
        />
        <Route
          path='/job-list'
          element={
            <Layout>
              <JobList />
            </Layout>
          }
        />
        <Route
          path='/contactUs'
          element={
            <Layout>
              <ContactUs />
            </Layout>
          }
        />
        <Route
          path='/aboutUs'
          element={
            <Layout>
              <AboutUs />
            </Layout>
          }
        />
        <Route
          path='/userProfile'
          element={
            <Layout>
              <ProfilePage />
            </Layout>
          }
        />
        <Route
          path='/jobDescription'
          element={
            <Layout>
              <JobDescription />
            </Layout>
          }
        />







        {/* Employee Portal Routes */}

        <Route
          path='/employer/dashboard'
          element={
            <EmployerParent>
              <EmployeeDash />
            </EmployerParent>
          }
        />
        <Route
          path='/employer/addJob'
          element={
            <EmployerParent>
              <AddNewJob />
            </EmployerParent>
          }
        />
        <Route
          path='/employer/Profile'
          element={
            <EmployerParent>
              <EmployerProfile />
            </EmployerParent>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </div>
  );
}

export default App;
