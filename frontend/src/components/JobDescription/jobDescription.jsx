import React, { useState } from 'react';
import './jobDescription.css';
import companyIco from '../../images/dummyLogo2.jpeg'

function JobDescription() {
    const [requiredSkills, setRequiredSkills] = useState(['Java', 'ROR', 'Js']);
    return (
        <section className='jobDescriptionParent'>
            <div className='banner_section'>
                <div className='container'>
                    <div className='description_flex'>
                        <div className='companyHead'>
                            <img src={companyIco} alt="Company Icon" />
                            <h1>Job Title is this</h1>
                        </div>
                        <button className='description_apply'>Apply Now</button>
                    </div>
                </div>
            </div>
            <div className='jobDetailSection'>
                <div className='container'>
                    <h2>About Job</h2>
                    <div className='jobDescription'>
                        <div className='description_flex'>
                            <h3>Job Title is this</h3>
                            <div className='job_type'>Part-Time</div>
                        </div>

                        <p>Company name & Job location</p>
                        <span>Salary Range is this</span>

                        <div className='description_flex'>
                            <div className='job_typeCat'>
                                <h4 className='heading_jobDesc'>Job Category</h4>
                                <span>Web Development</span>
                            </div>
                            <div className='job_typeCat'>
                                <h4 className='heading_jobDesc'>Experience Type</h4>
                                <span>Beginner</span>
                            </div>
                        </div>

                        <div className='skillSet'>
                            <h4 className='heading_jobDesc'>Skills Required</h4>
                            <div className='skilss_container'>
                                {requiredSkills.map((skill, i) => (
                                    <div key={i} className='skill_tags'>
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='job_description'>
                            <h4 className='heading_jobDesc'>Job Description</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>

                        <div className='Language_required'>
                            <h3 className='heading_jobDesc'>Languages Required</h3>
                            <div className='language_prnt'>
                                <div className='lan_re'>English</div>
                                <div className='lan_re'>Hindi</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default JobDescription