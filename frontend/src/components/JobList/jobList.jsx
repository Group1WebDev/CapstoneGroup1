import React, { useState } from 'react';
import './jobList.css';
import Header from '../Header/Header';
import Footer from '../Footer/footer';
import company1Logo from '../../images/dummyLogo1.jpg';
import company2Logo from '../../images/dummyLogo2.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt, faBriefcase, faClock } from '@fortawesome/free-solid-svg-icons';

export default function Jobs() {
  const [radius, setRadius] = useState(100);
  const [salary, setSalary] = useState(50000);

  const jobsListing = [
    {
      company: 'Company 1',
      title: 'Web Designer / Developer',
      location: 'Australia',
      time: '2 days ago',
      type: 'Full Time',
      logo: company1Logo,
    },
    {
      company: 'Company 2',
      title: 'Marketing Director',
      location: 'Russia',
      time: '5 days ago',
      type: 'Part Time',
      logo: company2Logo,
    },
  ];

  return (
    <>
      <div className='jobListPage'>
        <div className='searchBg'>
          <div className='container'>
            <div className='search_bar'>
              <div className='search_field'>
                <FontAwesomeIcon icon={faSearch} className='icon' />
                <input type='text' placeholder='Job title, keywords, or company' />
              </div>
              <div className='search_field'>
                <FontAwesomeIcon icon={faMapMarkerAlt} className='icon' />
                <input type='text' placeholder='City or postcode' />
              </div>
              <div className='search_field'>
                <FontAwesomeIcon icon={faBriefcase} className='icon' />
                <select>
                  <option value=''>Choose a category</option>
                  <option value='tech'>Tech</option>
                  <option value='finance'>Finance</option>
                  <option value='marketing'>Marketing</option>
                  <option value='food'>Food</option>
                  <option value='construction'>Construction</option>
                </select>
              </div>
              <button className='search_button'>Find Jobs</button>
            </div>
          </div>
        </div>

        <div className='content_area'>
          <div className='container'>
            <div className='filter_area'>
              <h2>Location</h2>
              <div className='areaSlider'>
                <label>Search Radius</label>
                <input type='range' min='0' max='200' value={radius} onChange={(e) => setRadius(e.target.value)} />
                <div>{radius}km</div>
              </div>

              <h2>Category</h2>
              <div className='filter_field'>
                <select>
                  <option value=''>Choose a category</option>
                  <option value='tech'>Technology</option>
                  <option value='finance'>Finance</option>
                  <option value='marketing'>Marketing</option>
                  <option value='food'>Food</option>
                  <option value='construction'>Construction</option>
                </select>
              </div>

              <h2>Job type</h2>
              <div className='job-type'>
                <label>
                  <input type='checkbox' />
                  Freelancer
                </label>
                <label>
                  <input type='checkbox' />
                  Full Time
                </label>
                <label>
                  <input type='checkbox' />
                  Part Time
                </label>
                <label>
                  <input type='checkbox' />
                  Temporary
                </label>
              </div>

              <h2>Date Posted</h2>
              <div className='date-posted'>
                <label>
                  <input type='radio' name='datePosted' />
                  All
                </label>
                <label>
                  <input type='radio' name='datePosted' />
                  Last Hour
                </label>
                <label>
                  <input type='radio' name='datePosted' />
                  Last 24 Hours
                </label>
                <label>
                  <input type='radio' name='datePosted' />
                  Last 7 Days
                </label>
                <label>
                  <input type='radio' name='datePosted' />
                  Last 14 Days
                </label>
                <label>
                  <input type='radio' name='datePosted' />
                  Last 30 Days
                </label>
              </div>

              <h2>Experience Level</h2>
              <div className='experience-level'>
                <label>
                  <input type='checkbox' />
                  Fresh
                </label>
                <label>
                  <input type='checkbox' />1 Year
                </label>
                <label>
                  <input type='checkbox' />2 Years
                </label>
                <label>
                  <input type='checkbox' />3 Years
                </label>
                <label>
                  <input type='checkbox' />4 Years
                </label>
              </div>

              <div className='salarySlider'>
                <label>Salary Range</label>
                <input type='range' min='0' max='300000' step='1000' value={salary} onChange={(e) => setSalary(e.target.value)} />
                <div>${salary.toLocaleString()} per Annum</div>
              </div>

              <button>Apply Filter</button>
            </div>

            <div className='job_grid'>
              {jobsListing.map((job, index) => (
                <div key={index} className='job_card'>
                  <div className='job_card_header'>
                    <div className='img_logo'>
                      <img src={job.logo} alt={`${job.company} logo`} className='job_logo' />
                    </div>
                    <div className='job_info'>
                      <h3>{job.company}</h3>
                      <span className='job_type'>{job.type}</span>
                    </div>
                    <p>
                      <FontAwesomeIcon icon={faClock} /> {job.time}
                    </p>
                  </div>
                  <div className='job_card_body'>
                    <h4>{job.title}</h4>
                    <p>
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> {job.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
