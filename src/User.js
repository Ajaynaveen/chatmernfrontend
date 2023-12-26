import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import logo from './Images/livechatapp.jpeg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function User() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('https://chatmernbackend.onrender.com/user/fetchusers', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` ${token}`,
          },
          params: { search: searchTerm }, 
        });

        if (response) {
          setUsers(response.data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [searchTerm]); // Update the user list whenever searchTerm changes

  const handleChatClick = async (user) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'https://chatmernbackend.onrender.com/chat',
        {
          userID: user._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        }
      );

      if (response) {
        console.log(response);
        const chatId = response.data.chatId;
        navigate(`/app/chat/${chatId}`, { state: { user } });
      } else {
        console.error('Failed to create or fetch chat');
      }
    } catch (error) {
      console.error('Error creating or fetching chat:', error);
    }
  };

  return (
    <div className='list-container'>
      <div className='ug-header'>
        <img src={logo} alt='profile' style={{ height: '38px', width: '38px', marginLeft: '20px' }} />
        <p className='ug-title'>online users</p>
      </div>
      <div className='sidebar-search'>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input
          placeholder='search'
          className='search-box'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
        />
      </div>
      <div className='ug-list'>
        {users.map((user) => (
          <div key={user._id} className='list-item' onClick={() => handleChatClick(user)}>
            <p className='con-icon'>{user.name[0]}</p>
            <p className='con-name'>{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
