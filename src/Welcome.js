import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './Images/livechatapp.jpeg';
import axios from 'axios';

function Welcome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
   
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      
      navigate('/');
    } else {
      
      fetchUserDetails(authToken);
    }
  }, [navigate]);
  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get('https://chatmernbackend.onrender.com/user/details', {
        headers: {
          Authorization: `${token}`,
        },
      });
  
      if (response.data) {
        setUser(response.data);
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };
  
  

  return (
    <div className='welcome-container'>
      <img src={logo} alt='logo' className='welcome-logo' />
      
      {user ? (
        <p>{`${user.name} and other people in this room can view and chat`}</p>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}

export default Welcome;
