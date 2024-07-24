import React, { useEffect } from 'react';
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

import './App.css';
import './responsive.css';

import { AuthProvider, useAuth } from './useToken';
import EmployerProfile from './components/Employer/EmployerProfile/employerProfile';
import ProfilePage from './components/Profile/updateProfile';
import ForgotPasswordScreen from './components/ForgotPassword/forgotPassword';
import JobDescription from './components/JobDescription/jobDescription.jsx';
import EmployerLayout from './EmployerLayout.jsx';
import { AddProfileDetails } from './components/Profile/addProfileDetails.jsx';
import JobsPosted from './components/Employer/JobsPostedEmployer/jobsListEmployer.jsx';
import { JobApplication } from './components/JobApplication/jobApplication.jsx';

const Layout = ({ children }) => {
  const location = useLocation();
  const { userInfo } = useAuth();
  const noHeadFooter = ['/login', '/signup', '/forgotPassword'].includes(location.pathname);
  const hideEmployerFooter = userInfo?.role === 'employer';

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
      {!noHeadFooter && <Nav />}
      {children}
      {!noHeadFooter && !hideEmployerFooter && <Footer />}
    </section>
  );
};

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
          path='/jobList'
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
          path='/jobDescription/:id'
          element={
            <Layout>
              <JobDescription />
            </Layout>
          }
        />
        <Route
          path='/addProfile'
          element={
            <Layout>
              <AddProfileDetails />
            </Layout>
          }
        />
        <Route
          path='/jobApplication/:id'
          element={
            <Layout>
              <JobApplication />
            </Layout>
          }
        />

        {/* Employee Portal Routes */}

        <Route
          path='/employer/dashboard'
          element={
            <EmployerLayout>
              <EmployerParent>
                <EmployeeDash />
              </EmployerParent>
            </EmployerLayout>
          }
        />
        <Route
          path='/employer/addJob'
          element={
            <EmployerLayout>
              <EmployerParent>
                <AddNewJob />
              </EmployerParent>
            </EmployerLayout>
          }
        />
        <Route
          path='/employer/Profile'
          element={
            <EmployerLayout>
              <EmployerParent>
                <EmployerProfile />
              </EmployerParent>
            </EmployerLayout>
          }
        />
        <Route
          path='/employer/Profile'
          element={
            <EmployerLayout>
              <EmployerParent>
                <EmployerProfile />
              </EmployerParent>
            </EmployerLayout>
          }
        />
        <Route
          path='/employer/JobsPosted'
          element={
            <EmployerLayout>
              <EmployerParent>
                <JobsPosted />
              </EmployerParent>
            </EmployerLayout>
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
