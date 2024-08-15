import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash, faBars } from '@fortawesome/free-solid-svg-icons';
import CustomLoadFunction from '../../CustomLoader/customLoader';



export default function CandidatesList() {
    const [applicants, setApplicants] = useState([]);
    const [responseLoading, setResponseLoading] = useState(false);
    let user = JSON.parse(sessionStorage.getItem('userInfo'))
    const fetchJobs = async () => {
        setResponseLoading(true);
        try {
            const response = await fetch(`http://localhost:5001/jobs-by-employer/${user.user.id}`);
            if (!response.ok) {
                throw new Error('err to fetch job details');
            }
            const data = await response.json();
            console.log('data', data)
            setResponseLoading(false);
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
            alert('Something wrong in fetching job details')
            setResponseLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs()
    }, [])
    return (
        <>
            {
                responseLoading ? (
                    <CustomLoadFunction />
                ) : (
                    <div>
                        <h1>Candidates List</h1>
                        <br /><br />
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
                )
            }
        </>
    )
}