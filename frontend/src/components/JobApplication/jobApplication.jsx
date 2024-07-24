import React, { useState } from 'react';
import './jobApplication.css';
import CompanyLogo from '../../images/dummyLogo1.jpg';
import { useLocation } from 'react-router-dom';

export const JobApplication = () => {
    const location = useLocation();
    const { jobDetails } = location.state || {};
    console.log('sds',jobDetails);
    const [userProfile, setUserProfile] = useState({
        fName: '',
        lName: '',
        userMail: '',
        totalExp: '',
        userResume: null,
        userCoverL: ''
    });

    return (
        <div className='jobApplicationParent'>
            <div className='container'>
                <div className='PagePartition'>
                    <div className='pagePartitionLeft'>
                        <div className='Image_divParent'>
                            <img src={CompanyLogo} alt="companyIcon" className='compIco'/>
                        </div>
                        {jobDetails && (
                            <>
                                <h1>{jobDetails.jobTitle}</h1>
                                <span>{jobDetails.province}, {jobDetails.country}</span>
                            </>
                        )}
                        <a href="">Back To Job Description</a>
                    </div>
                    <div className='pagePartitionRight'>
                        <h2>Candidate Details</h2>
                        <form action="">
                            <div className='oneline_input'>
                                <div className='input_parent'>
                                    <label>First Name:</label>
                                    <input type='text' name='fName' />
                                </div>
                                <div className='input_parent'>
                                    <label>Last Name:</label>
                                    <input type='text' name='lName' />
                                </div>
                            </div>
                            <div className='input_parent'>
                                <label>Email:</label>
                                <input type='text' name='userMail' />
                            </div>
                            <div className='oneline_input'>
                                <div className='input_parent'>
                                    <label>Total Years of experience:</label>
                                    <input type='number' name='totalExp' />
                                </div>
                                <div className='input_parent'>
                                    <label>Upload Resume:</label>
                                    <input type="file" name="userResume" accept=".pdf, .doc, .docx" />
                                </div>
                            </div>
                            <div className='input_parent'>
                                <label>Cover Letter</label>
                                <textarea value="" name='userCoverL' rows='5' />
                            </div>
                            <div className='center_content'>
                                <button className='submit_button'>Apply</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
