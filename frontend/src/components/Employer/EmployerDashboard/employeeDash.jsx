import React, { useEffect, useState } from 'react';
import './employeeDash.css';
import userImage from '../../../images/dummyLogo1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash, faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function EmployeeDash() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([])

    const [applicants, setApplicants] = useState([]);

    const handleCandidatesListViewAll = () => {
        navigate('/emplpoyer/candidatesList');
    };
    const handleJobListViewAll = () => {
        navigate('/employer/JobsPosted');
    };
    let user = JSON.parse(sessionStorage.getItem('userInfo'))

    const fetchJobs = async () => {
        try {
            const response = await fetch(`http://localhost:5001/jobs-by-employer/${user.user.id}`);
            if (!response.ok) {
                throw new Error('err to fetch job details');
            }
            const data = await response.json();
            console.log('data', data)
            setJobs(data);

            // mapping candidates list applied on job
            let applicantsList = []
            data.forEach((job) => {
                job.applied_by.forEach((application) => {
                    applicantsList.push({
                        jobTitle: job.jobTitle,
                        user: application.userId
                    })
                });
            });
            setApplicants(applicantsList);
        } catch (error) {
            console.error('err fetching job details:', error);
        }
    };

    useEffect(() => {
        fetchJobs()
    }, [])
    return (
        <>
            <h1 className='heading_top'>Dashboard</h1>
            <section className='candidates_table'>
                <div className='flexRowContainer'>
                    <h2>Applicants List</h2>
                    <span><button className='view_allBtn' onClick={handleCandidatesListViewAll}>View All</button></span>
                </div>


                <div className='tableParent'>
                    <table id="candidates_tb">
                        <tr>
                            <th>Sr. No.</th>
                            <th>Image</th>
                            <th>Applicant Name</th>
                            <th>Job Title</th>
                            <th>Action</th>
                        </tr>
                        {applicants.map((applicant, index) =>
                            <tr>
                                <td>{index + 1}</td>
                                <td className='image_cell'><img src={applicant.user.profilePic} alt="userImage" /></td>
                                <td>{applicant.user.firstname}</td>
                                <td>{applicant.jobTitle}</td>
                                <td><a href="">View</a></td>
                            </tr>
                        )}
                    </table>
                </div>
            </section>


            <section className='job_postedTable'>
                <div className='flexRowContainer'>
                    <h3>Jobs Posted</h3>
                    <span><button className='view_allBtn' onClick={handleJobListViewAll}>View All</button></span>
                </div>

                <div className='tableParent'>
                    <table id="candidates_tb">
                        <tr>
                            <th>Job Title</th>
                            <th>Candidates Applied</th>
                            <th>Vacancies</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {jobs.length !== 0 && jobs.map((job) =>
                            <tr>
                                <td>{job.jobTitle}</td>
                                <td>{job.jobApplications}</td>
                                <td>{job.jobVacancies} Vacancies</td>
                                <td>{job.jobStatus ? "Active" : "Inactive"}</td>
                                <td className='IconsDiv'>
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faEye} />
                                    </div>
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </div>
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </table>
                </div>
            </section>
        </>
    )
}

export default EmployeeDash