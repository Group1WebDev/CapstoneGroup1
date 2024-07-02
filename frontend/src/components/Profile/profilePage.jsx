import React, { useState } from 'react';
import './profilePage.css'
import userImg from '../../images/user_icon.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faLocationDot } from '@fortawesome/free-solid-svg-icons';

function ProfilePage() {
    const [isUserEditing, setUserEditing] = useState(false);

    const [username, setUserName] = useState('Akshay Singh');
    const [useremail, setUserEmail] = useState('akshaysingh@gmail.com');
    const [userphone, setUserPhone] = useState('1234567890');
    const [userGender, setUserGender] = useState('Select Gender');
    const [userDesignation, setUserDesignation] = useState('Developer');
    const [userSkillset, setUserSkillset] = useState(['html', 'css', 'js', 'reactJS', 'nodeJS']);
    const [userLocation, setUserLocation] = useState('Vancouver, CA');
    const [userInfo, setUserInfo] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu');
    const [userProfilePic, setUserProfilePic] = useState(userImg);
    const [userEduDetail, setUserEduDetail] = useState([
        { edu: 'Graduation from Kurukshetra University, India', date: 'May, 2023' },
        { edu: 'Schooling from CBSE, India', date: 'May, 2019' }
    ])
    const [userExperience, setUserExperience] = useState([
        { company: 'LecielTechnologies', position: 'Frontend Developer', duration: 'Jan 2020 - Dec 2022' },
        { company: 'Quality Services', position: 'Web Designer', duration: 'Jan 2019 - Jan 2020' }
    ]);
    const [profileDetail, setProfileDetail] = useState({
        username: 'akshaysingh123',
        password: '********'
    });

    const handleEditIconClick = () => {
        setUserEditing(!isUserEditing);
    };
    const edu_Update = (index, field, value) => {
        const updatedEdu = [...userEduDetail];
        updatedEdu[index][field] = value;
        setUserEduDetail(updatedEdu);
    };
    const exp_Update = (index, field, value) => {
        const updatedExp = [...userExperience];
        updatedExp[index][field] = value;
        setUserExperience(updatedExp);
    };
    const handleUpdateButton = () => {
        setUserEditing(false);
    };

    const changeClass = isUserEditing ? 'shadow_input' : '';

    return (
        <section className='profilePage userProfile'>
            <div className='banner_section'>
            </div>
            <div className='container'>
                <div className='img_prnt'>
                    <div className='img_bg'>
                        <img src={userProfilePic} alt="user_icon image" />
                    </div>
                    <div className='info_area'>
                        <div className='user_detail'>
                            <h2>
                                {isUserEditing ? (
                                    <input
                                        className={changeClass}
                                        type='text'
                                        value={username}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                ) : (
                                    username
                                )}
                            </h2>
                            <p className='userTitle'>
                                {isUserEditing ? (
                                    <input
                                        className={changeClass}
                                        type='text'
                                        value={userDesignation}
                                        onChange={(e) => setUserDesignation(e.target.value)}
                                    />
                                ) : (
                                    userDesignation
                                )}
                            </p>
                            <div className='skilss_bg'>
                                {userSkillset.map((skill, index) => (
                                    <div key={index} className='skill_tags'>
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='icon_content'>
                            <div className='locationIcon'><FontAwesomeIcon icon={faLocationDot} /></div>
                            <span className='userLocation'>
                                {isUserEditing ? (
                                    <input
                                        className={changeClass}
                                        type='text'
                                        value={userLocation}
                                        onChange={(e) => setUserLocation(e.target.value)}
                                    />
                                ) : (
                                    userLocation
                                )}
                            </span>
                        </div>
                    </div>

                    <div className='editBtn' onClick={handleEditIconClick}>
                        <button>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>
                </div>

                {/* Personal details section */}
                <div className='personal_details'>
                    <h2>Personal Details</h2>
                    <div className='profile_input'>
                        <label>Bio</label>
                        {isUserEditing ? (
                            <textarea
                                className={changeClass}
                                cols="30"
                                rows="6"
                                value={userInfo}
                                onChange={(e) => setUserInfo(e.target.value)}
                            />
                        ) : (
                            <textarea cols="30" rows="6" value={userInfo} disabled></textarea>
                        )}
                    </div>

                    <div className='oneline_input'>
                        <div className='profile_input'>
                            <label>Gender</label>
                            {isUserEditing ? (
                                <input
                                    className={changeClass}
                                    type="text"
                                    value={userGender}
                                    onChange={(e) => setUserGender(e.target.value)}
                                />
                            ) : (
                                <input type="text" value={userGender} disabled />
                            )}
                        </div>

                        <div className='profile_input'>
                            <label>Email</label>
                            {isUserEditing ? (
                                <input
                                    className={changeClass}
                                    type="email"
                                    value={useremail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                />
                            ) : (
                                <input type="email" value={useremail} disabled />
                            )}
                        </div>

                        <div className='profile_input'>
                            <label>Phone Number</label>
                            {isUserEditing ? (
                                <input
                                    className={changeClass}
                                    type="phone"
                                    value={userphone}
                                    onChange={(e) => setUserPhone(e.target.value)}
                                />
                            ) : (
                                <input type="phone" value={userphone} disabled />
                            )}
                        </div>
                    </div>
                </div>

                {/* Education details section */}
                <div className='personal_details'>
                    <h2>Education Details</h2>
                    <div className='profile_input'>
                        <ul>
                            {userEduDetail.map((edu, index) => (
                                <li key={index} className='flexRowContainer'>
                                    <h4>
                                        {isUserEditing ? (
                                            <input
                                                className={changeClass}
                                                type='text'
                                                value={edu.edu}
                                                onChange={(e) =>
                                                    edu_Update(index, 'edu', e.target.value)
                                                }
                                            />
                                        ) : (
                                            edu.edu
                                        )}
                                    </h4>
                                    <span>
                                        {isUserEditing ? (
                                            <input
                                                className={changeClass}
                                                type='text'
                                                value={edu.date}
                                                onChange={(e) =>
                                                    edu_Update(index, 'date', e.target.value)
                                                }
                                            />
                                        ) : (
                                            edu.date
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Experience details section */}
                <div className='personal_details'>
                    <h2>Experience Details</h2>
                    <div className='profile_input'>
                        <ul>
                            {userExperience.map((exp, index) => (
                                <li key={index} className='flexRowContainer'>
                                    <h4>
                                        {isUserEditing ? (
                                            <input
                                                className={changeClass}
                                                type='text'
                                                value={exp.company}
                                                onChange={(e) =>
                                                    exp_Update(index, 'company', e.target.value)
                                                }
                                            />
                                        ) : (
                                            exp.company
                                        )}
                                    </h4>
                                    <span>
                                        {isUserEditing ? (
                                            <input
                                                className={changeClass}
                                                type='text'
                                                value={exp.position}
                                                onChange={(e) =>
                                                    exp_Update(index, 'position', e.target.value)
                                                }
                                            />
                                        ) : (
                                            exp.position
                                        )}
                                    </span>
                                    <span>
                                        {isUserEditing ? (
                                            <input
                                                className={changeClass}
                                                type='text'
                                                value={exp.duration}
                                                onChange={(e) =>
                                                    exp_Update(index, 'duration', e.target.value)
                                                }
                                            />
                                        ) : (
                                            exp.duration
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Account Settings */}
                <div className='personal_details'>
                    <h2>Account Settings</h2>
                    <div className='oneline_input'>
                        <div className='profile_input'>
                            <label>Username</label>
                            {isUserEditing ? (
                                <input
                                    className={changeClass}
                                    type="text"
                                    value={profileDetail.username}
                                    onChange={(e) =>
                                        setProfileDetail({ ...profileDetail, username: e.target.value })
                                    }
                                />
                            ) : (
                                <input type="text" value={profileDetail.username} disabled />
                            )}
                        </div>

                        <div className='profile_input'>
                            <label>Password</label>
                            {isUserEditing ? (
                                <input
                                    className={changeClass}
                                    type="password"
                                    value={profileDetail.password}
                                    onChange={(e) =>
                                        setProfileDetail({ ...profileDetail, password: e.target.value })
                                    }
                                />
                            ) : (
                                <input type="password" value={profileDetail.password} disabled />
                            )}
                        </div>
                    </div>
                </div>

                <div className='update_button'>
                    <button onClick={handleUpdateButton}>Update</button>
                </div>
            </div>
        </section>
    )
}

export default ProfilePage