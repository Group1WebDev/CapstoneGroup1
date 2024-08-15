import React, { useState, useEffect } from 'react';
import CustomLoadFunction from '../CustomLoader/customLoader';
import './jobList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt, faBriefcase, faLanguage, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Jobs() {
  const [responseLoading, setResponseLoading] = useState(false);
  const [radius, setRadius] = useState(100);
  const [salary, setSalary] = useState(50000);
  const [jobsListing, setJobsListing] = useState([]);
  const [filterExpand, setFilterExpand] = useState(false);
  const [userSearchInput, setUserSearchInput] = useState("");
  const [userLocationInput, setUserLocationInput] = useState("");
  const [userSelectedCategory, setUserSelectedCategory] = useState("");
  const [apifilteredJobs, setApifilteredJobs] = useState([]);


  const jobSearchHandler = () => {
    const finalFilteredResult =
      jobsListing.filter((job) => {
        const searchedKeywords =
          job.jobTitle.toLowerCase().includes(userSearchInput.toLowerCase()) ||
          job.jobType.toLowerCase().includes(userSearchInput.toLowerCase());

        const searchedLocation =
          job.city.toLowerCase().includes(userLocationInput.toLowerCase()) ||
          job.province.toLowerCase().includes(userLocationInput.toLowerCase()) ||
          job.country.toLowerCase().includes(userLocationInput.toLowerCase());

        const searchedCategory =
          userSelectedCategory === "" ||
          userSelectedCategory === "allCategory" ||
          job.jobCategory.toLowerCase() === userSelectedCategory.toLowerCase();

        return searchedKeywords && searchedLocation && searchedCategory;
      });
    setApifilteredJobs(finalFilteredResult);
  }


  useEffect(() => {
    const fetchJobs = async () => {
      setResponseLoading(true);
      try {
        const response = await fetch('http://localhost:5001/jobs');
        if (!response.ok) {
          throw new Error(`err ${response.status}`);
        }
        const data = await response.json();
        setJobsListing(data);
        setApifilteredJobs(data);
      } catch (error) {
        console.error('err fetching job:', error);
      }
      setResponseLoading(false);
    };

    fetchJobs();
  }, []);

  return (
    <>
      {responseLoading ? (
        <CustomLoadFunction />
      ) : (
        <div className='jobListPage'>
          <div className='searchBg'>
            <div className='container'>
              <div className='search_bar'>
                <div className='search_field'>
                  <FontAwesomeIcon icon={faSearch} className='icon' />
                  <input type='text' placeholder='Job title, keywords, or company' onChange={(e) => setUserSearchInput(e.target.value)} />
                </div>
                <div className='search_field'>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className='icon' />
                  <input type='text' placeholder='City or postcode' onChange={(e) => setUserLocationInput(e.target.value)} />
                </div>
                <div className='search_field'>
                  <FontAwesomeIcon icon={faBriefcase} className='icon' />
                  <select onChange={(e) => setUserSelectedCategory(e.target.value)}>
                    <option value=''>Choose a category</option>
                    <option value='allCategory'>All categories</option>
                    <option value='technology'>Tech</option>
                    <option value='finance'>Finance</option>
                    <option value='marketing'>Marketing</option>
                    <option value='food'>Food</option>
                    <option value='construction'>Construction</option>
                  </select>
                </div>
                <button className='search_button' onClick={jobSearchHandler}>Find Jobs</button>
              </div>
            </div>
          </div>

          <div className='content_area'>
            <div className='container'>
              <button className='filterExpandBtn' onClick={() => setFilterExpand(!filterExpand)}>Expand Filters</button>
              <div className={`filter_area ${filterExpand ? '' : 'filterCollapsed'}`}>
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
                {apifilteredJobs.map((job, index) => (
                  <Link to={'/jobDescription/' + job._id}>
                    <div key={index} className='job_card'>
                      <div className='job_card_header'>
                        <div className='job_info'>
                          <h3>{job.jobTitle}</h3>
                          <span className='job_type'>{job.jobType}</span>
                        </div>
                      </div>
                      <div className='job_card_body'>
                        <h4>{job.company}</h4>
                        <p>
                          <FontAwesomeIcon icon={faMapMarkerAlt} /> {job.province}, {job.country}
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faBriefcase} /> {job.jobCategory} - {job.experienceLevel}
                        </p>
                        <p>{job.jobDescription}</p>
                        <p>
                          ${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()} per annum
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faLanguage} /> {job.languageRequirement.join(', ')}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
