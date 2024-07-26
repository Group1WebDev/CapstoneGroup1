import React, { useState } from 'react';
import { z } from 'zod';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const signupSchema = z.object({
  email: z.string({ required_error: 'Email cannot be empty' }).email({ message: 'Please enter a valid email address' }),
  password: z.string({ required_error: 'Password cannot be empty' }).min(1, { message: 'Password cannot be empty' }),
  firstName: z.string({ required_error: 'First name cannot be empty' }).min(1, { message: 'First name cannot be empty' }),
  lastName: z.string({ required_error: 'Last name cannot be empty' }).min(1, { message: 'Last name cannot be empty' }),
});

const Signup = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const [signupPassVisible, setSignupPassVisible] = useState(false);

  const toggleSignupPassVisibile = () => {
    setSignupPassVisible(!signupPassVisible);
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      default:
        break;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setFirstNameError('');
    setLastNameError('');

    const validate = signupSchema.safeParse({
      email,
      password,
      firstName,
      lastName,
    });

    if (validate.success) {
      try {
        const result = await fetch('http://localhost:5001/userRegister', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: password,
            firstname: firstName,
            lastname: lastName,
            role: selectedRole,
          }),
        });
        if (result.ok) {
          const resultJson = await result.json();
          console.log(resultJson);
          if (selectedRole === 'user') {
            navigate('/userProfile');
          }
          else {
            navigate('/login');
          }
        } else {
          alert('Registration failed!');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      for (const error of validate.error.issues) {
        switch (error.path.toString()) {
          case 'email':
            setEmailError(error.message);
            break;
          case 'password':
            setPasswordError(error.message);
            break;
          case 'firstName':
            setFirstNameError(error.message);
            break;
          case 'lastName':
            setLastNameError(error.message);
            break;
          default:
            break;
        }
      }
    }
  };

  const [selectedRole, setSelectedRole] = useState('');

  const handleRadioChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div className='LoginBg registerPage'>
      <div className='LoginBox'>
        <div>
          <h2 className='registerHead'>
            Register as <span>User</span>
          </h2>
          <div>
            <span className='selectBold'>
              Select your Role:
            </span>
            <div className='userRadio'>
              <label htmlFor="employer_role">Employer</label>
              <input
                type='radio'
                name='userRole'
                id='employer_role'
                value='employer'
                checked={selectedRole === 'employer'}
                onChange={handleRadioChange}
              />
              <label htmlFor="user_role">User</label>
              <input
                type="radio"
                name='userRole'
                id='user_role'
                value='user'
                checked={selectedRole === 'user'}
                onChange={handleRadioChange}
              />
            </div>
          </div>

          <form onSubmit={submitHandler}>
            <div className='input_login'>
              <label htmlFor='firstName'>First Name:</label>
              <input id='firstName' name='firstName' value={firstName} onChange={handleChange} />
              <div className='err_input'>{firstNameError}</div>
            </div>
            <div className='input_login'>
              <label htmlFor='lastName'>Last Name:</label>
              <input type='text' id='lastName' name='lastName' value={lastName} onChange={handleChange} />
              <div className='err_input'>{lastNameError}</div>
            </div>
            <div className='input_login'>
              <label htmlFor='email'>Email:</label>
              <input type='email' id='email' name='email' value={email} onChange={handleChange} />
              <div className='err_input'>{emailError}</div>
            </div>
            <div className='input_login'>
              <label htmlFor='password'>Password:</label>
              <div className='input_eye'>
                <input
                  type={signupPassVisible ? "text" : "password"}
                  id='password'
                  name='password'
                  value={password}
                  onChange={handleChange}
                />
                <FontAwesomeIcon
                  icon={signupPassVisible ? faEyeSlash : faEye}
                  onClick={toggleSignupPassVisibile}
                  className='fontIcon'
                />
              </div>
              <div className='err_input'>{passwordError}</div>
            </div>
            <button type='submit'>Register</button>
            <div className='noaccount'>
              <span>Already have an account?</span>
              <Link to='/login'>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
