import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faDollarSign, faMapMarkerAlt, faBriefcase, faLanguage, faBuilding } from '@fortawesome/free-solid-svg-icons';


export default function JobViewPage() {
    const { jobId } = useParams();
    const [viewJobDetails, setViewJobDetails] = useState(null);

    useEffect(() => {
        const fetchViewJob = async () => {
            try {
                const response = await fetch(`http://localhost:5001/jobs/${jobId}`);
                if (!response.ok) {
                    throw new Error('no job data');
                }
                const data = await response.json();
                setViewJobDetails(data);
            } catch (error) {
                console.error('no job data', error);
            }
        };

        fetchViewJob();
    }, [jobId]);

    console.log(viewJobDetails, 'skdkskadk')
    if (!viewJobDetails) {
        return <div>No job details found.</div>;
    }

    return (
        <section className='jobDescriptionParent'>
            <div className='banner_section viewPage'>
                <div className='container'>
                    <div className='description_flex'>
                        <div className='companyHead'>
                            <h1>{viewJobDetails.jobTitle}</h1>
                            <div className='jobLocation'>
                                <FontAwesomeIcon className="iconLoc" icon={faMapMarkerAlt} />{viewJobDetails.addressLine}, {viewJobDetails.city}, {viewJobDetails.province}, {viewJobDetails.country}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='jobDetailSection'>
                <div className='container'>
                    <h2>About Job</h2>
                    <div className='jobDescription'>
                        <div className='description_flex'>
                            <h3>{viewJobDetails.jobTitle}</h3>
                            <div className='job_type'>{viewJobDetails.jobType}</div>
                        </div>

                        <p>
                            <FontAwesomeIcon icon={faMapMarkerAlt} /> {viewJobDetails.province}, {viewJobDetails.country}
                        </p>
                        <p>
                            ${viewJobDetails.minSalary.toLocaleString()} - ${viewJobDetails.maxSalary.toLocaleString()} per annum
                        </p>

                        <div className='description_flex'>
                            <div className='job_typeCat'>
                                <h4 className='heading_jobDesc'>Job Category</h4>
                                <span>{viewJobDetails.jobCategory}</span>
                            </div>
                            <div className='job_typeCat'>
                                <h4 className='heading_jobDesc'>Experience Level</h4>
                                <span>{viewJobDetails.experienceLevel}</span>
                            </div>
                        </div>

                        {viewJobDetails.requiredSkills && (
                            <div className='skillSet'>
                                <h4 className='heading_jobDesc'>Skills Required</h4>
                                <div className='skilss_container'>
                                    {viewJobDetails.requiredSkills.map((skill, i) => (
                                        <div key={i} className='skill_tags'>
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className='job_description'>
                            <h4 className='heading_jobDesc'>Job Description</h4>
                            <p>{viewJobDetails.jobDescription}</p>
                        </div>

                        {viewJobDetails.languageRequirement && (
                            <div className='Language_required'>
                                <h3 className='heading_jobDesc'>Languages Required</h3>
                                <div className='language_prnt'>
                                    {viewJobDetails.languageRequirement.map((language, i) => (
                                        <div key={i} className='lan_re'>
                                            {language}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className='description_flex'>
                            <div className=''>
                                <h4 className='heading_jobDesc'>Total Applications</h4>
                                <span>{viewJobDetails.jobApplications}</span>
                            </div>
                            <div className=''>
                                <h4 className='heading_jobDesc'>Total Vacancies</h4>
                                <span>{viewJobDetails.jobVacancies}</span>
                            </div>
                            <div className=''>
                                <h4 className='heading_jobDesc'>Salary</h4>
                                <span>{viewJobDetails.minSalary}$ - {viewJobDetails.maxSalary}$ per annum</span>
                            </div>
                        </div>


                        <div className='applicantsList'>
                            <h4 className='heading_jobDesc'>Applicants Resume</h4>
                            <div className='tableParent'>
                                <table id="candidates_tb">
                                    <tr>
                                        <th>Applicant No.</th>
                                        <th>Action</th>
                                    </tr>
                                    {viewJobDetails.applied_by && viewJobDetails.applied_by.map((applicant, i) => (
                                        <tr key={i}>
                                            <td>Applicant {i + 1}</td>
                                            <td>
                                                <a href={applicant.resume} target="_blank" rel="noopener noreferrer" className='viewResumeLink'>View Resume</a>
                                            </td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
