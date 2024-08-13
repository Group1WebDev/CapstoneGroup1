import React, { useState, useEffect } from 'react';
import './jobApplication.css';
import CompanyLogo from '../../images/dummyLogo1.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link,NavLink, useHistory } from 'react-router-dom';

export const JobApplication = () => {
    let navigate = useNavigate();
    let user = JSON.parse(sessionStorage.getItem('userInfo'))
    const location = useLocation();
    const { jobDetails } = location.state || {};
    console.log('sds', jobDetails);
    const [userProfile, setUserProfile] = useState({
        totalExp: '',
        userResume: null,
        userCoverL: ''
    });

    const [submiterrors, setSubmiterrors] = useState({});
    const [submitData, setSubmitData] = useState(false);


    const ApplicationValidations = (values) => {
        let errs = {};
        if (values.totalExp === '') {
            errs.totalExp = 'Enter total experience';
        }
        if (values.userResume === null) {
            errs.userResume = 'Upload a resume file';
        }
        if (values.userCoverL === '') {
            errs.userCoverL = 'Please fill cover letter field';
        }
        return errs;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setUserProfile((prevProfile) => ({
            ...prevProfile,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmiterrors(ApplicationValidations(userProfile));
        setSubmitData(true);
    };
    useEffect(() => {
        const submitFormData = async () => {
            const applicantData = new FormData();
            applicantData.append('totalExp', userProfile.totalExp);
            applicantData.append('resume', userProfile.userResume);
            applicantData.append('userCoverL', userProfile.userCoverL);
            applicantData.append('userId', user.user.id);

            try {
                const response = await fetch('http://localhost:5001/jobs/' + jobDetails._id, {
                    method: 'POST',
                    body: applicantData,
                });

                if (!response.ok) {
                    console.log('err in submitting');
                }

                const result = await response.json();
                console.log('Application Submitted', result);
                alert('Application Submitted');
                navigate('/');
            } catch (error) {
                console.error('err submitting application:', error);
            }
        };


        if (submitData && Object.keys(submiterrors).length === 0) {
            submitFormData();
        } else {
            setSubmitData(false);
        }
    }, [submiterrors]);

    return (
        <div className='jobApplicationParent'>
            <div className='container'>
                <div className='PagePartition'>
                    <div className='pagePartitionLeft'>
                        <div className='Image_divParent'>
                            <img src={CompanyLogo} alt="companyIcon" className='compIco' />
                        </div>
                        {jobDetails && (
                            <>
                                <h1>{jobDetails.jobTitle}</h1>
                                <span>{jobDetails.province}, {jobDetails.country}</span>
                            </>
                        )}
                      <a onClick={() => navigate(-1)}>Back To Job Description</a>

                    </div>
                    <div className='pagePartitionRight'>
                        <h2>Candidate Details</h2>
                        <form action="" onSubmit={handleSubmit}>
                            <div className='oneline_input'>
                                <div className='input_parent'>
                                    <label>Total Years of experience:</label>
                                    <input type='number' name='totalExp' value={userProfile.totalExp} onChange={handleChange} />
                                    {submiterrors.totalExp && <p className="erMessage">{submiterrors.totalExp}</p>}
                                </div>
                                <div className='input_parent'>
                                    <label>Upload Resume:</label>
                                    <input type="file" name="userResume" accept=".pdf, .doc, .docx" onChange={handleChange} />
                                    {submiterrors.userResume && <p className="erMessage">{submiterrors.userResume}</p>}
                                </div>
                            </div>
                            <div className='input_parent'>
                                <label>Cover Letter</label>
                                <textarea name='userCoverL' rows='5' value={userProfile.userCoverL} onChange={handleChange} />
                                {submiterrors.userCoverL && <p className="erMessage">{submiterrors.userCoverL}</p>}
                            </div>

                            <div className='useResume'>
                                <span>If you want to create a new Resume, then use our Resume Builder by </span>
                                <NavLink to="/resume-builder">Clicking here</NavLink>
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
