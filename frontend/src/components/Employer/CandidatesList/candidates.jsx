import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash, faBars } from '@fortawesome/free-solid-svg-icons';

export default function CandidatesList() {
  const [applicants, setApplicants] = useState([]);
  let user = JSON.parse(sessionStorage.getItem('userInfo'));
  const fetchJobs = async () => {
    try {
      const response = await fetch(`https://group-1-capstone.onrender.com/jobs-by-employer/${user.user.id}`);
      if (!response.ok) {
        throw new Error('err to fetch job details');
      }
      const data = await response.json();
      console.log('data', data);

      // mapping candidates list applied on job
      let applicantsList = [];
      data.forEach((job) => {
        job.applied_by.forEach((application) => {
          applicantsList.push({
            jobTitle: job.jobTitle,
            user: application.userId,
          });
        });
      });
      setApplicants(applicantsList);
    } catch (error) {
      console.error('err fetching job details:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <div>
      <h1>Candidates List</h1>
      <br />
      <br />
      <table id='candidates_tb'>
        <tr>
          <th>Sr. No.</th>
          <th>Image</th>
          <th>Applicant Name</th>
          <th>Job Title</th>
          <th>Action</th>
        </tr>
        {applicants.map((applicant, index) => (
          <tr>
            <td>{index + 1}</td>
            <td className='image_cell'>
              <img src={applicant.user.profilePic} alt='userImage' />
            </td>
            <td>{applicant.user.firstname}</td>
            <td>{applicant.jobTitle}</td>
            <td>
              <a href=''>View</a>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
