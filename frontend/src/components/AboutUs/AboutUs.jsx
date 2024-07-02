
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/footer';
import vector1 from '../../images/vector12.png';
import vector2 from '../../images/vector123.png';
import './aboutus.css';

function AboutUs() {
  return (
    <>
      <Header />
      <section className="aboutSection">
      
        <div className="banner"><h1>About Us</h1></div>
        
        <div className="container">
    
          <div className="content">
            <div className="text">
              <p>
                Welcome to TalentHunt! We are committed to delivering the best products and services to our customers.
                Our team is passionate, skilled, and dedicated to achieving excellence in all that we do.
              </p>
              <p>
                Our mission is to create innovative solutions that meet the evolving needs of our clients and contribute
                to their success. We value integrity, collaboration, and continuous improvement.
              </p>
              <div className="overview">
                <h2>Overview</h2>
                <p>
                  TalentHunt comprises two primary parts: an employee-facing employee portal and an applicant-friendly job board.
                  This dual strategy guarantees effective and efficient service to both sides of the labor market.
                </p>
                <h3>Job Seekers Part</h3>
                <ul>
                  <li>User Registration and Profile Setup</li>
                  <li>Search Filter</li>
                  <li>Resume Builder</li>
                </ul>
                <h3>Employers Part</h3>
                <ul>
                  <li>Employer Account and Profile Setup</li>
                  <li>Jobs Posting Platform</li>
                </ul>
              </div>
              <div className="motivation">
                <h2>Our Motivation</h2>
                <p>
                  Our typical enthusiasm for using technology to solve real-world problems inspired us to create TalentHunt.
                  The employment market is one of the most dynamic and highly competitive environments, posing substantial
                  challenges for job seekers and businesses. By creating TalentHunt, we aim to bridge the gap between talent
                  and opportunity, making the job search and recruiting process more accessible, efficient, and effective.
                </p>
                <h2>Personal Growth and Market Relevance</h2>
                <p>
                  Developing TalentHunt gives us a fantastic opportunity to improve our technical abilities. This comprehensive
                  approach will help us better comprehend the web development process, from user interface design to database
                  management and server-side logic. Our goal is to satisfy the growing need for an all-inclusive, user-friendly
                  platform that caters to the requirements of businesses and job searchers.
                </p>
              </div>
            </div>
            <div className="images">
              <div className='image_bg'>
                <img src={vector1} alt="Team working" className="image" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default AboutUs;
