import React,{useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash, faBars } from '@fortawesome/free-solid-svg-icons';



export default function JobsPosted() {
  const [jobs,setJobs]= useState([])
    let user= JSON.parse(sessionStorage.getItem('userInfo'))
    const fetchJobs = async () => {
        try {
          const response = await fetch(`http://localhost:5001/jobs-by-employer/${user.user.id}`);
          if (!response.ok) {
            throw new Error('err to fetch job details');
          }
          const data = await response.json();
          console.log('data',data)
          setJobs(data);
        } catch (error) {
          console.error('err fetching job details:', error);
        }
      };

    useEffect(()=>{
        fetchJobs()
    },[])
  return (
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
          <tr>
            <td>{job.jobTitle}</td>
            <td>{job.jobApplications}</td>
            <td>{job.jobVacancies} Vacancies</td>
            <td>{job.jobStatus ? "Active" : "Inactive"}</td>
            <td className='IconsDiv'>
              <div className='icon'>
                View  
                {/* <FontAwesomeIcon icon={faEye} /> */}
              </div>
              <br />
              <div className='icon'>
                Edit{/* <FontAwesomeIcon icon={faPenToSquare} /> */}
              </div>
              <br />
              <div className='icon'>
                Delete{/* <FontAwesomeIcon icon={faTrash} /> */}
              </div>
            </td>
          </tr>
        )}
      </table>
    </div>
  )
}
