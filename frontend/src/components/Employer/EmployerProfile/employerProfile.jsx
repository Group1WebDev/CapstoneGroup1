import React, { useState } from 'react';
import userImg from '../../../images/user_icon.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faLocationDot } from '@fortawesome/free-solid-svg-icons';

function EmployerProfile() {

    const [isUserEditing, setUserEditing] = useState(false);

    const [username, setUserName] = useState('Technovate Company');
    const [useremail, setUserEmail] = useState('technovate@gmail.com');
    const [userphone, setUserPhone] = useState('1234567890');
    const [userLocation, setUserLocation] = useState('Vancouver, CA');
    const [companyInfo, setCompanyInfo] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu');
    const [userProfilePic, setUserProfilePic] = useState(userImg);
    const [profileDetail, setProfileDetail] = useState({
        username: 'akshaysingh123',
        password: '********'
    });

    const handleEditIconClick = () => {
        setUserEditing(!isUserEditing);
    };
    const handleUpdateButton = () => {
        setUserEditing(false);
    };

    const changeClass = isUserEditing ? 'shadow_input' : '';

    return (
        <section className='profilePage'>
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
                            value={companyInfo}
                            onChange={(e) => setCompanyInfo(e.target.value)}
                        />
                    ) : (
                        <textarea cols="30" rows="6" value={companyInfo} disabled></textarea>
                    )}
                </div>

                <div className='oneline_input'>
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
        </section>

    )
};


export default EmployerProfile