import React, { useState, useEffect } from 'react';
import './profilePage.css';
import { useAuth } from '../../useToken';
import userImg from '../../images/user_icon.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faLocationDot } from '@fortawesome/free-solid-svg-icons';

function ProfilePage() {
  let user = JSON.parse(sessionStorage.getItem('userInfo'));

  const [isUserEditing, setUserEditing] = useState(false);

  const [username, setUserName] = useState('');
  const [useremail, setUserEmail] = useState('');
  const [userphone, setUserPhone] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userDesignation, setUserDesignation] = useState('');
  const [userSkillset, setUserSkillset] = useState([]);
  const [userLocation, setUserLocation] = useState('');
  const [userInformation, setUserInformation] = useState('');
  const [userProfilePic, setUserProfilePic] = useState(userImg);
  const [userEduDetail, setUserEduDetail] = useState({});
  const [userExperience, setUserExperience] = useState([]);

  const handleEditIconClick = () => {
    setUserEditing(!isUserEditing);
  };

  const handleUpdateButton = () => {
    setUserEditing(false);
  };

  const changeClass = isUserEditing ? 'shadow_input' : '';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/get_Userprofile/${user.user.id}`);
        const data = await response.json();
        const userData = data.data;

        console.log(userData.userSkills, 'sadsd');
        if (userData.firstname && userData.lastname) {
          setUserName(userData.firstname + userData.lastname);
        }
    
        setUserName(`${userData.firstname} ${userData.lastname}`);
        setUserEmail(userData.email);
        setUserPhone(userData.phone);
        setUserGender(userData.gender);
        setUserDesignation(userData.userDesignation);
        setUserSkillset(userData.userSkills);
        setUserLocation(userData.locDetail);
        setUserInformation(userData.bio);
        setUserProfilePic(userData.profilePic);
        setUserEduDetail(userData.userEducation);
        setUserExperience(userData.userExp);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user.user.id]);

  const dateF = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <section className='profilePage userProfile'>
      <div className='banner_section'></div>
      <div className='container'>
        <div className='img_prnt'>
          <div className='img_bg'>
            <img src={userProfilePic} alt='user_icon image' />
          </div>
          <div className='info_area'>
            <div className='user_detail'>
              <h2>{isUserEditing ? <input className={changeClass} type='text' value={username} onChange={(e) => setUserName(e.target.value)} /> : username}</h2>
              <p className='userTitle'>{isUserEditing ? <input className={changeClass} type='text' value={userDesignation} onChange={(e) => setUserDesignation(e.target.value)} /> : userDesignation}</p>
              <div className='skilss_bg'>
                {userSkillset?.map((skill, index) => (
                  <div key={index} className='skill_tags'>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div className='icon_content'>
              <div className='locationIcon'>
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <span className='userLocation'>{userLocation}</span>
            </div>
          </div>

          <div className='editBtn' onClick={handleEditIconClick}>
            <button>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        </div>

        <div className='personal_details'>
          <h2>Personal Details</h2>
          <div className='profile_input'>
            <label>Bio</label>
            {isUserEditing ? <textarea className={changeClass} cols='30' rows='6' value={userInformation} onChange={(e) => setUserInformation(e.target.value)} /> : <textarea cols='30' rows='6' value={userInformation} disabled></textarea>}
          </div>

          <div className='oneline_input'>
            <div className='profile_input'>
              <label>Gender</label>
              {isUserEditing ? <input className={changeClass} type='text' value={userGender} onChange={(e) => setUserGender(e.target.value)} /> : <input type='text' value={userGender} disabled />}
            </div>

            <div className='profile_input'>
              <label>Email</label>
              {isUserEditing ? <input className={changeClass} type='email' value={useremail} onChange={(e) => setUserEmail(e.target.value)} /> : <input type='email' value={useremail} disabled />}
            </div>
          </div>
        </div>

        <div className='personal_details'>
          <h2>Education Details</h2>
          <div className='profile_input'>
            <ul>
              <li className='flexRowContainer'>
                <h4>{isUserEditing ? <input className={changeClass} type='text' value={userEduDetail.institutionName} onChange={(e) => setUserEduDetail.institutionName(e.target.value)} /> : userEduDetail.institutionName}</h4>
                <p>{isUserEditing ? <input className={changeClass} type='text' value={userEduDetail.field} onChange={(e) => setUserEduDetail.field(e.target.value)} /> : userEduDetail.field}</p>
                <span>{isUserEditing ? <input className={changeClass} type='date' value={dateF(userEduDetail.completionDate)} onChange={(e) => setUserEduDetail({ ...userEduDetail, completionDate: e.target.value })} /> : dateF(userEduDetail.completionDate)}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className='personal_details'>
          <h2>Experience Details</h2>
          <div className='profile_input'>
            <ul>
              <li className='flexRowContainer'>
                <h4>{isUserEditing ? <input className={changeClass} type='text' value={userExperience.companyName} /> : userExperience.companyName}</h4>
                <br />
                <span>{isUserEditing ? <input className={changeClass} type='text' value={userExperience.jobDesignation} /> : userExperience.jobDesignation}</span>
                <br />
                <span>{isUserEditing ? <input className={changeClass} type='text' value={dateF(userExperience.jobStartDate)} /> : `Started on: ${dateF(userExperience.jobStartDate)}`}</span>
                <span>{isUserEditing ? <input className={changeClass} type='text' value={dateF(userExperience.jobEndDate)} /> : `Ended on: ${dateF(userExperience.jobEndDate)}`}</span>
              </li>
            </ul>
          </div>

          <div className='update_button'>
            <button onClick={handleUpdateButton}>Update</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
