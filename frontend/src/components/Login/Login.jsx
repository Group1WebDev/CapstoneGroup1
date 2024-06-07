import React, { useState } from 'react';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import './login.css';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../useToken';

const loginSchema = z.object({
  email: z.string({ required_error: 'Email cannot be empty' }).email({ message: 'Please enter valid email address' }),
  password: z.string({ required_error: 'Password cannot be empty' }).min(1, { message: 'Password cannot be empty' }),
});

const Login = () => {
  const { setToken } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    const validate = loginSchema.safeParse({ email, password });
    if (validate.success) {
      try {
        const result = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        if (result.ok) {
          const resultJson = await result.json();
          var userInfo = {
            token: resultJson.token,
            user: resultJson.user,
          };
          setToken(userInfo);

          if (resultJson.user.userType) {
            window.location = '/admin/';
          } else {
            navigate(`/`);
          }
        } else {
          alert('Login failed!');
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
          default:
            break;
        }
      }
    }
  };
  return (
    <div>
      <div className='LoginBg'>
        <div className='LoginBox'>
          <h2>Login</h2>
          <div>
            <div className='input_login'>
              <label htmlFor='username'>Username:</label>
              <input type='text' id='username' name='email' value={email} onChange={handleChange} />
              <div className='err_input'>{emailError}</div>
            </div>
            <div className='input_login'>
              <label htmlFor='password'>Password:</label>
              <input type='password' id='password' name='password' onChange={handleChange} value={password} />
              <div className='err_input'>{passwordError}</div>
            </div>
            <button type='submit' onClick={submitHandler}>
              Login
            </button>
            <div className='noaccount'>
              <span>Don't have an account?</span>
              <Link to='/signup'>Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
