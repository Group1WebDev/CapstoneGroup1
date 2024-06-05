import React from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer'
import vector1 from '../../images/vector12.png';
import vector2 from '../../images/vector123.png';
import mobile from '../../images/mobile.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faLaptop, faChartColumn, faSuitcaseMedical, faBuildingColumns, faNewspaper, faUtensils, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons';

// import LocationSearchInput from './autoSearch'
import './homepage.css';

function Homepage() {
  return (
    <>
      <Header />
      <section className="headSection">
        <div className="container">
          <div className="flexCenter">
            <h1>
              Welcome To <span>Talent Hunt</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="container">
          <div className="search-container">
            <input type="text" className="input_box" placeholder="Job title, keywords..." />
            <input type="text" className="input_box" placeholder="Job Industry" />
            {/* <div>
            <LocationSearchInput/>
            </div> */}
            <select className="select_box">
              <option value="all">All Locations</option>
              <option value="Toronto">Toronto</option>
              <option value="Vancouver">Vancouver</option>
              <option value="Montreal">Montreal</option>
              <option value="Kitchener">Kitchener</option>
            </select>
            <button className="search_button">Find Jobs</button>
          </div>
        </div>
      </section>

      <section>
        <div className='container register_Section'>
          <div className='right image_area'>
            <div className='image_bg'>
              <img className='img_1' src={vector1} alt='vector background image' />
              <img className='img_2' src={vector2} alt='vector background image' />
            </div>
          </div>
          <div className='left text_area'>
            <span className='caps_on'>Join us</span>
            <h1 className=''>Join Talenthunt Now</h1>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum</p>
            <button className='register_button'>Signup Now</button>
          </div>
        </div>
      </section>


      <section className='trending_section'>
        <span className="caps_on">trending</span>
        <h2 className="trending_heading">POPULAR CATEGORIES</h2>
        <div className="container trending">
          <div className="trending_card">
            <div className="icon">
              <FontAwesomeIcon icon={faCode} />
            </div>
            <h3>Development</h3>
            <p>(240 jobs)</p>
          </div>
          <div className="trending_card">
            <div className="icon">
              <FontAwesomeIcon icon={faLaptop} />
            </div>
            <h3>IT</h3>
            <p>(504 jobs)</p>
          </div>
          <div className="trending_card">
            <div className="icon">
              <FontAwesomeIcon icon={faChartColumn} />
            </div>
            <h3>Accounting</h3>
            <p>(2250 jobs)</p>
          </div>
          <div className="trending_card">
            <div className="icon">
              <FontAwesomeIcon icon={faSuitcaseMedical} />
            </div>
            <h3>Medical</h3>
            <p>(2002 jobs)</p>
          </div>
          <div className="trending_card">
            <div className="icon">
              <FontAwesomeIcon icon={faBuildingColumns} />
            </div>
            <h3>Government</h3>
            <p>(1457 jobs)</p>
          </div>
          <div className="trending_card">
            <div className="icon">
              <FontAwesomeIcon icon={faNewspaper} />
            </div>
            <h3>Media & News</h3>
            <p>(2142 jobs)</p>
          </div>
          <div className="trending_card">
            <div className="icon">
              <FontAwesomeIcon icon={faUtensils} />
            </div>
            <h3>Restaurants</h3>
            <p>(2342 jobs)</p>
          </div>
          <div className="trending_card">
            <div className="icon">
              <FontAwesomeIcon icon={faTableCellsLarge} />
            </div>
            <h3>All Jobs</h3>
            <p>(2000+ jobs)</p>
          </div>
        </div>
      </section>

      <div className="app-download-section">
        <div className='container'>
          <div className="app-download-content">
            <div className="app-info">
              <h2>DOWNLOAD TALENT HUNT APP NOW!</h2>
              <p>Fast, Simple & Delightful. All it takes is 30 seconds to Download.</p>
              <button className="register_button">DOWNLOAD NOW</button>
            </div>
            <div className='image_bg'>
              <img src={mobile} alt="App on Phone" className="phone-image" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Homepage;
