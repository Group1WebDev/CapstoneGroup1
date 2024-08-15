import React, { useState } from 'react';
import './profilePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../useToken';

export default function UpdatePass() {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [oldPassVisible, setOldPassVisible] = useState(false);
    const [newPassVisible, setNewPassVisible] = useState(false);
    const [message, setMessage] = useState('');
    const { token, userInfo } = useAuth();

    const toggleOldPassVisible = () => {
        setOldPassVisible(!oldPassVisible);
    };

    const toggleNewPassVisible = () => {
        setNewPassVisible(!newPassVisible);
    };

    const handleUpdateUserPass = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5001/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userInfo.id,
                    oldPassword: oldPass,
                    newPassword: newPass,
                }),
            });

            const result = await response.json();
            setMessage(result.message);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className='updatePasswordParent'>
                <form onSubmit={handleUpdateUserPass}>
                    <div className='input_parent'>
                        <label>Old Password</label>
                        <div className='input_eye'>
                            <input type={oldPassVisible ? 'text' : 'password'} className='old_pass' value={oldPass} onChange={(e) => setOldPass(e.target.value)} required />
                            <FontAwesomeIcon icon={oldPassVisible ? faEyeSlash : faEye} onClick={toggleOldPassVisible} className='fontIcon' />
                        </div>
                    </div>
                    <div className='input_parent'>
                        <label>New Password</label>
                        <div className='input_eye'>
                            <input type={newPassVisible ? 'text' : 'password'} className='confirm_pass' value={newPass} onChange={(e) => setNewPass(e.target.value)} required />
                            <FontAwesomeIcon icon={newPassVisible ? faEyeSlash : faEye} onClick={toggleNewPassVisible} className='fontIcon' />
                        </div>
                    </div>
                    <button type='submit'>Update Password</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </>
    );
}