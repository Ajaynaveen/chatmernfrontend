import React, { useState } from 'react';
import logo from './Images/livechatapp.jpeg';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function SignUp() {
    const navigate=useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
     
      const response = await axios.post('https://chatmernbackend.onrender.com/user/signup', {
        name,
        email,
        password,
      });

     
      console.log('Server response:', response.data);
      navigate('/login')
    } catch (error) {
      
      console.error('Error signing up:', error.message);
      alert(`Error signing up: ${error.message}`);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-image'>
        <img src={logo} alt='logo' className='welcome-logo' />
      </div>
      <div className='login-box'>
        <p>Create your account</p>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          id="outlined-email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete='current-password'
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="outlined" onClick={handleSignUp}>
          Sign Up
        </Button>
        <p>Already log in user
        <Link to="/login">login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
