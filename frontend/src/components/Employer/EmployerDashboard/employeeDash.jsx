import React, { useState } from 'react';
import './employeeDash.css';
import userImage from '../../../images/dummyLogo1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash, faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function EmployeeDash() {
    const navigate = useNavigate();

    const handleJobListViewAll = () => {
        navigate('/employer/JobsPosted');
    };
    return (
        <>
            <h1 className='heading_top'>Dashboard</h1>
            <section className='candidates_table'>
                <div className='flexRowContainer'>
                    <h2>Applicants List</h2>
                    <span><button className='view_allBtn'>View All</button></span>
                </div>


                <table id="candidates_tb">
                    <tr>
                        <th>Sr. No.</th>
                        <th>Image</th>
                        <th>Applicant Name</th>
                        <th>Job Title</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td className='image_cell'><img src={userImage} alt="userImage" /></td>
                        <td>Ajay</td>
                        <td>Full-Stack Developer</td>
                        <td><a href="">View</a></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td className='image_cell'><img src={userImage} alt="userImage" /></td>
                        <td>Anni</td>
                        <td>Frontend Developer</td>
                        <td><a href="">View</a></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td className='image_cell'><img src={userImage} alt="userImage" /></td>
                        <td>Abhay</td>
                        <td>Backend Developer</td>
                        <td><a href="">View</a></td>
                    </tr>
                </table>
            </section>


            <section className='job_postedTable'>
                <div className='flexRowContainer'>
                    <h3>Jobs Posted</h3>
                    <span><button className='view_allBtn' onClick={handleJobListViewAll}>View All</button></span>
                </div>

                <table id="candidates_tb">
                    <tr>
                        <th>Job Title</th>
                        <th>Candidates Applied</th>
                        <th>Vacancies</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>Sr. Web Designer</td>
                        <td>07 Applications</td>
                        <td>20 Vacancies</td>
                        <td>Inactive</td>
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
                </table>
            </section>
        </>
    )
}

export default EmployeeDash