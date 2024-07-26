import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import JobList from './components/JobList/jobList';
import Nav from './components/Header/Header';
import Footer from './components/Footer/footer';
import Homepage from './components/Homepage/homepage';
import './App.css';

import { useState } from 'react';

import { AuthProvider, useAuth } from './useToken';

const Layout = ({ children }) => {
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
      <Footer />
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
          path='/job-list'
          element={
            <Layout>
              <JobList />
            </Layout>
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
