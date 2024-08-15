import React, { useState, useEffect } from 'react';
import './jobDescription.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faMapMarkerAlt, faBriefcase, faLanguage, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';

function JobDescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState(null);

  const handleApplyClick = () => {
    navigate(`/jobApplication/${id}`, { state: { jobDetails } });
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`https://group-1-capstone.onrender.com/jobs/${id}`);
        if (!response.ok) {
          throw new Error('err to fetch job details');
        }
        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        console.error('err fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (!jobDetails) {
    return <div>Loading...</div>;
  }

  return (
    <section className='jobDescriptionParent'>
      <div className='banner_section'>
        <div className='container'>
          <div className='description_flex'>
            <div className='companyHead'>
              {/* <img src={jobDetails.logo} alt='Company Logo' className='company_logo' /> */}
              <h1>{jobDetails.jobTitle}</h1>
            </div>
            <button className='description_apply' onClick={handleApplyClick}>
              Apply Now
            </button>
          </div>
        </div>
      </div>
      <div className='jobDetailSection'>
        <div className='container'>
          <h2>About Job</h2>
          <div className='jobDescription'>
            <div className='description_flex'>
              <h3>{jobDetails.jobTitle}</h3>
              <div className='job_type'>{jobDetails.jobType}</div>
            </div>

            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {jobDetails.province}, {jobDetails.country}
            </p>
            <p>
              ${jobDetails.minSalary.toLocaleString()} - ${jobDetails.maxSalary.toLocaleString()} per annum
            </p>

            <div className='description_flex'>
              <div className='job_typeCat'>
                <h4 className='heading_jobDesc'>Job Category</h4>
                <span>{jobDetails.jobCategory}</span>
              </div>
              <div className='job_typeCat'>
                <h4 className='heading_jobDesc'>Experience Level</h4>
                <span>{jobDetails.experienceLevel}</span>
              </div>
            </div>

            {jobDetails.requiredSkills && (
              <div className='skillSet'>
                <h4 className='heading_jobDesc'>Skills Required</h4>
                <div className='skilss_container'>
                  {jobDetails.requiredSkills.map((skill, i) => (
                    <div key={i} className='skill_tags'>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className='job_description'>
              <h4 className='heading_jobDesc'>Job Description</h4>
              <p>{jobDetails.jobDescription}</p>
            </div>

            {jobDetails.languageRequirement && (
              <div className='Language_required'>
                <h3 className='heading_jobDesc'>Languages Required</h3>
                <div className='language_prnt'>
                  {jobDetails.languageRequirement.map((language, i) => (
                    <div key={i} className='lan_re'>
                      {language}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default JobDescription;
