import React, { useState } from 'react';
import './forgotPassword.css';
import forgotImage from '../../images/forgotScreen.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [confPass, setConfPass] = useState('');

  const [newPassVisible, setNewPassVisible] = useState(false);
  const [confPassVisible, setConfPassVisible] = useState(false);

  const togglenewPassVisibile = () => {
    setNewPassVisible(!newPassVisible);
  };
  const toggleconfPassVisibile = () => {
    setConfPassVisible(!confPassVisible);
  };

  const handleOtpRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/generateOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail }),
      });

      const responseData = await response.json();
      if (response.ok) {
        alert('OTP sent');
        setOtpSent(true);
      } else {
        alert(`err ${responseData.error}`);
      }
    } catch (error) {
      console.error('err:', error);
    }
  };

  const handleSubmitForgotScreen = async (e) => {
    e.preventDefault();
    if (newPass !== confPass) {
      alert('Confirm Password and new password should be same');
      return;
    }
    try {
      const response = await fetch('http://localhost:5001/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, otp, newPass }),
      });

      const responseData = await response.json();
      if (response.ok) {
        alert('New Password is updated successfully');
        navigate('/login');
      } else {
        console.error('err in creating password:', responseData);
        alert(`err in password updating: ${responseData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='forgotPageParent'>
      <div className='forgot_leftZone'>
        <img src={forgotImage} alt='Background image for forgot screen' />
      </div>
      <div className='forgot_righZone'>
        <h1>Forgot Password</h1>
        <p>Reset your password by entering current password and new password.</p>

        <form onSubmit={handleOtpRequest} style={{ display: otpSent ? 'none' : 'block' }}>
          <div className='input_parent'>
            <label>Email</label>
            <div className=''>
              <input type='email' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
            </div>
          </div>
          <div className='submit_parent'>
            <button type='submit'>Send OTP</button>
          </div>
        </form>

        {otpSent && (
          <form onSubmit={handleSubmitForgotScreen}>
            <div className='input_parent'>
              <label>OTP</label>
              <div className='input_eye'>
                <input type='text' className='otp_input' value={otp} onChange={(e) => setOtp(e.target.value)} required />
              </div>
            </div>
            <div className='input_parent'>
              <label>New Password</label>
              <div className='input_eye'>
                <input type={newPassVisible ? 'text' : 'password'} className='new_pass' value={newPass} onChange={(e) => setNewPass(e.target.value)} required />
                <FontAwesomeIcon icon={newPassVisible ? faEyeSlash : faEye} onClick={togglenewPassVisibile} className='fontIcon' />
              </div>
            </div>
            <div className='input_parent'>
              <label>Confirm New Password</label>
              <div className='input_eye'>
                <input type={confPassVisible ? 'text' : 'password'} className='confirm_pass' value={confPass} onChange={(e) => setConfPass(e.target.value)} required />
                <FontAwesomeIcon icon={confPassVisible ? faEyeSlash : faEye} onClick={toggleconfPassVisibile} className='fontIcon' />
              </div>
            </div>
            <div className='submit_parent'>
              <button>Submit</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordScreen;