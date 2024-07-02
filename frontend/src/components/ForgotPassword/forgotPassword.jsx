import React, { useState } from 'react';
import './forgotPassword.css';
import forgotImage from '../../images/forgotScreen.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function ForgotPasswordScreen() {
    const [crrPassVisible, setCrrPassVisible] = useState(false);
    const [newPassVisible, setNewPassVisible] = useState(false);
    const [confPassVisible, setConfPassVisible] = useState(false);

    const togglecrrPassVisibile = () => {
        setCrrPassVisible(!crrPassVisible);
    }
    const togglenewPassVisibile = () => {
        setNewPassVisible(!newPassVisible);
    }
    const toggleconfPassVisibile = () => {
        setConfPassVisible(!confPassVisible);
    }

    return (
        <div className='forgotPageParent'>
            <div className='forgot_leftZone'>
                <img src={forgotImage} alt="Background image for forgot screen" />
            </div>
            <div className='forgot_righZone'>
                <h1>Forgot Password</h1>
                <p>Reset your password by entering current password and new password.</p>
                <form action="">
                    <div className='input_parent'>
                        <label>Current Password</label>
                        <div className='input_eye'>
                            <input
                                type={crrPassVisible ? "text" : "password"}
                                className='current_pass' />
                            <FontAwesomeIcon
                                icon={crrPassVisible ? faEyeSlash : faEye}
                                onClick={togglecrrPassVisibile}
                                className='fontIcon'
                            />
                        </div>
                    </div>
                    <div className='input_parent'>
                        <label>New Password</label>
                        <div className='input_eye'>
                            <input
                                type={newPassVisible ? "text" : "password"}
                                className='new_pass' />
                            <FontAwesomeIcon
                                icon={newPassVisible ? faEyeSlash : faEye}
                                onClick={togglenewPassVisibile}
                                className='fontIcon'
                            />
                        </div>
                    </div>
                    <div className='input_parent'>
                        <label>Confirm New Password</label>
                        <div className='input_eye'>
                            <input
                                type={confPassVisible ? "text" : "password"}
                                className='confirm_pass' />
                            <FontAwesomeIcon
                                icon={confPassVisible ? faEyeSlash : faEye}
                                onClick={toggleconfPassVisibile}
                                className='fontIcon'
                            />
                        </div>
                    </div>
                    <div className='submit_parent'>
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPasswordScreen;