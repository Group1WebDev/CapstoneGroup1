import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash, faBars } from '@fortawesome/free-solid-svg-icons';
import CustomLoadFunction from '../../CustomLoader/customLoader';
import { useNavigate } from 'react-router-dom';



export default function JobsPosted() {
  const [jobs, setJobs] = useState([])
  const [responseLoading, setResponseLoading] = useState(false);
  const navigate = useNavigate();

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
      setJobs(data);
      setResponseLoading(false);
    } catch (error) {
      console.error('err fetching job details:', error);
      setResponseLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleJobView = (jobId) => {
    navigate(`/job_detail/${jobId}`);
  };
  const handleEditJob = (jobId) => {
    navigate(`/job_update/${jobId}`);
  };
  const handleDeleteJob = async (jobId) => {
    const deletConfirmation = window.confirm("Are you sure for deleting this job?");
    if (!deletConfirmation) return;

    try {
      const response = await fetch(`http://localhost:5001/jobs/${jobId}`, {
        method: 'DELETE',
      });

      if (response.status === 404) {
        alert("job not found");
      } else if (!response.ok) {
        alert("failed to delete");
      } else {
        alert("Deleted succesfully");
        fetchJobs();
      }
    } catch (error) {
      console.error('error in deleting job', error);
    }
  };
  return (
    <>
      {
        responseLoading ? (
          <CustomLoadFunction />
        ) : (
          <div>
            <h1>Jobs Posted</h1>
            <br /><br />
            <table id="candidates_tb">
              <tr>
                <th>Job Title</th>
                <th>Candidates Applied</th>
                <th>Vacancies</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              {jobs.length !== 0 && jobs.map((job) =>
                <tr key={job._id}>
                  <td>{job.jobTitle}</td>
                  <td>{job.jobApplications}</td>
                  <td>{job.jobVacancies} Vacancies</td>
                  <td>{job.jobStatus ? "Active" : "Inactive"}</td>
                  <td className='IconsDiv'>
                  <div className='icon view' onClick={() => handleJobView(job._id)}>
                      View
                      {/* <FontAwesomeIcon icon={faEye} /> */}
                    </div>
                    <br />
                    <div className='icon edit' onClick={() => handleEditJob(job._id)}>
                      Edit{/* <FontAwesomeIcon icon={faPenToSquare} /> */}
                    </div>
                    <br />
                    <div className='icon delete' onClick={() => handleDeleteJob(job._id)}>
                      Delete{/* <FontAwesomeIcon icon={faTrash} /> */}
                    </div>
                  </td>
                </tr>
              )}
            </table>
          </div>
        )}
    </>
  )
}
