import React, { useState, useEffect } from 'react';
import './profilePage.css';
import { TagsInput } from 'react-tag-input-component';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useNavigate } from 'react-router';
import addiconImage from '../../images/addicon.jpg';
import CustomLoadFunction from '../CustomLoader/customLoader';

export const AddProfileDetails = () => {
  const [skillSelected, setSkillSelected] = useState(['']);
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate()
  const [userDesignation, setUserDesignation] = useState('');
  const [userBio, setUserBio] = useState('');
  const [userGender, setUserGender] = useState('');
  const [addPic, setAddPic] = useState(addiconImage)
  const [userEducation, setUserEducation] = useState({
    institutionName: '',
    field: '',
    completionDate: '',
  });
  const [userExperience, setUserExperience] = useState({
    companyName: '',
    jobDesignation: '',
    jobStartDate: '',
    jobEndDate: '',
  });
  const [userPic, setUserPic] = useState(null);

  const [updatedAddress, setUpdatedAddress] = useState('');
  const [responseLoading, setResponseLoading] = useState(false);

  useEffect(() => {
    if (userLocation && userLocation.label) {
      setUpdatedAddress(userLocation.label);
    }
  }, [userLocation]);

  const handleEducDetails = (e) => {
    const { name, value } = e.target;
    setUserEducation((user_edu) => ({
      ...user_edu,
      [name]: value,
    }));
  };

  const handleExpDetails = (e) => {
    const { name, value } = e.target;
    setUserExperience((user_exp) => ({
      ...user_exp,
      [name]: value,
    }));
  };

  let user = JSON.parse(sessionStorage.getItem('userInfo'))
  // console.log(user)


  const [profileErrors, setProfileErrors] = useState([]);



  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    setResponseLoading(true);
    const userProfileData = {
      userDesignation,
      skillSelected,
      userLocation: updatedAddress,
      userBio,
      userGender,
      userEducation,
      userExperience,
      userPic,
    };
    console.log(userProfileData)
    const sumbitData = new FormData()
    sumbitData.append('userDesignation', userProfileData.userDesignation);
    sumbitData.append('userSkills', userProfileData.skillSelected);
    sumbitData.append('locDetail', userProfileData.userLocation);
    sumbitData.append('bio', userProfileData.userBio);
    sumbitData.append('gender', userProfileData.userGender);
    sumbitData.append('userEducation', JSON.stringify(userProfileData.userEducation));
    sumbitData.append('userExp', JSON.stringify(userProfileData.userExperience));
    sumbitData.append('profile', userProfileData.userPic);
    console.log('Data Submitted', sumbitData);

    try {
      const response = await fetch('http://localhost:5001/updateProfile/' + user.user.id, {
        method: 'POST',
        body: sumbitData,
      });

      if (!response.ok) {
        console.log('err in submitting profile details');
        setResponseLoading(false);
      }
      const result = await response.json();
      console.log('profile details submitted', result);
      setTimeout(() => setResponseLoading(false), 400);
      navigate('/jobList');
    } catch (error) {
      console.error('err in submitting profile details', error);
      alert('Error in submitting your profile details. Please try again');
      setTimeout(() => setResponseLoading(false), 1000);
    }

  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserPic(file);
      setAddPic(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {responseLoading ? (
        <CustomLoadFunction />
      ) : (
        <section className='addProfileParent'>
          <div className='container'>
            <h1 className='p_heading'>Add Your Profile Information</h1>
            <div className='flex_pContainer'>
              <form onSubmit={handleSubmitDetails} className=''>
                <div className='form_groupArea'>
                  <div className='input_div'>
                    <label htmlFor='p_title'>Your Designation:</label>
                    <input type='text' id='p_title' name='designation' value={userDesignation} onChange={(e) => setUserDesignation(e.target.value)} />
                  </div>
                  <div className='input_div'>
                    <label htmlFor='p_skills'>Skills:</label>
                    <TagsInput value={skillSelected} onChange={setSkillSelected} name='userSkills' placeHolder='Enter skill and press enter' />
                  </div>
                  <div className='input_div'>
                    <label htmlFor=''>Location Detail:</label>
                    <GooglePlacesAutocomplete
                      selectProps={{
                        value: userLocation,
                        onChange: setUserLocation,
                      }}
                      autocompletionRequest={{
                        componentRestrictions: {
                          country: ['us', 'ca'],
                        },
                      }}
                    />
                    <div className='input_parent'>
                      <label htmlFor=''>Your Location:</label>
                      <span>{updatedAddress}</span>
                    </div>
                  </div>
                  <div className='input_div'>
                    <label htmlFor='p_bio'>Your Bio:</label>
                    <textarea name='p_bio' id='p_bio' value={userBio} onChange={(e) => setUserBio(e.target.value)}></textarea>
                  </div>
                  <div className='input_div'>
                    <label htmlFor='p_select'>Your Gender:</label>
                    <select name='userGender' id='' value={userGender} onChange={(e) => setUserGender(e.target.value)}>
                      <option value='' disabled>
                        Select Gender
                      </option>
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                      <option value='Other'>Other</option>
                    </select>
                  </div>

                  <div className='user_education'>
                    <h1>Education Details</h1>
                    <div className='input_div'>
                      <label htmlFor='p_institute'>Institution:</label>
                      <input type='text' name='institutionName' id='p_institute' value={userEducation.institutionName} onChange={handleEducDetails} />
                    </div>
                    <div className='input_div'>
                      <label htmlFor='p_studyField'>Field of Study:</label>
                      <input type='text' name='field' id='p_studyField' value={userEducation.field} onChange={handleEducDetails} />
                    </div>
                    <div className='input_div'>
                      <label htmlFor='p_completion'>Completion Date:</label>
                      <input type='date' name='completionDate' id='p_completion' value={userEducation.completionDate} onChange={handleEducDetails} />
                    </div>
                  </div>

                  <div className='user_experience'>
                    <h1>Experience Details</h1>
                    <div className='input_div'>
                      <label htmlFor='p_company'>Company Name:</label>
                      <input type='text' name='companyName' id='p_company' value={userExperience.companyName} onChange={handleExpDetails} />
                    </div>
                    <div className='input_div'>
                      <label htmlFor='p_designation'>Designation:</label>
                      <input type='text' name='jobDesignation' id='p_designation' value={userExperience.jobDesignation} onChange={handleExpDetails} />
                    </div>
                    <div className='input_div'>
                      <label htmlFor='p_startdate'>Start Date:</label>
                      <input type='date' name='jobStartDate' id='p_startdate' value={userExperience.jobStartDate} onChange={handleExpDetails} />
                    </div>
                    <div className='input_div'>
                      <label htmlFor='p_enddate'>End Date:</label>
                      <input type='date' name='jobEndDate' id='p_enddate' value={userExperience.jobEndDate} onChange={handleExpDetails} />
                    </div>
                  </div>
                  <div className='submit_div'>
                    <button type='submit'>Submit</button>
                  </div>
                </div>

                <div className='profilePicDiv input_div'>
                  <label htmlFor='imagePicker'>Choose Profile Picture</label>
                  <input type='file' name='userPic' id='imagePicker' accept='.png,.jpeg,.jpg' onChange={handleImageChange} />
                  <div className='top_div' onClick={() => document.getElementById('imagePicker').click()}>
                    <img src={addPic} alt='UserProfilePic' />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
