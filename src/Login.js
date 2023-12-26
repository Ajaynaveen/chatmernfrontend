import React, { useState } from 'react';
import logo from './Images/livechatapp.jpeg';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

function Login() {
  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null); // State to store the token

  const handleLogin = async () => {

    try {
      // Make a POST request to your server
      const response = await axios.post('https://chatmernbackend.onrender.com/user/login', {
        email,
        password,
      });

      // Handle the response
      const authToken = response.data.token;

      // Save the token to state
      setToken(authToken);

      
      localStorage.setItem('authToken', authToken);

     
      console.log('Login successful! Token:', authToken);
      navigate('/app/welcome')

    } catch (error) {
      // Handle errors
      console.error('Error logging in:', error.message);

      // Display an alert with the error message
      alert(`Error logging in: ${error.message}`);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-image'>
        <img src={logo} alt='logo' className='welcome-logo' />
      </div>
      <div className='login-box'>
        <p>Login to your account</p>

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

        <Button variant="outlined" onClick={handleLogin}>
          Login
        </Button>
        <p>Dont have an account
        <Link to="/"> signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
