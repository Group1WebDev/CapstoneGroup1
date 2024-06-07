import React, { useState } from 'react';
import { z } from 'zod';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';

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
        const result = await fetch('http://localhost:5000/userRegister', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: password,
            firstname: firstName,
            lastname: lastName,
          }),
        });
        if (result.ok) {
          const resultJson = await result.json();
          console.log(resultJson);
          navigate('/login');
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

  return (
    <div className='LoginBg registerPage'>
      <div className='LoginBox'>
        <div>
          <h2 className='registerHead'>
            Register as <span>User</span>
          </h2>
          <form onSubmit={submitHandler}>
            <div className='input_login'>
              <label htmlFor='firstName'>First Name:</label>
              <input type='text' id='firstName' name='firstName' value={firstName} onChange={handleChange} />
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
              <input type='password' id='password' name='password' value={password} onChange={handleChange} />
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
