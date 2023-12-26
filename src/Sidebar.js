import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, Tooltip } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import Conversations from './Conversations';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

function Sidebar() {
  const navigate = useNavigate();
  const [chats, setchats] = useState([]);
  
  const [flag,setflag]=useState(false)

  useEffect(() => {
   
    const fetchUsers = async (token) => {
      try {
        
        const response = await axios.get('https://chatmernbackend.onrender.com/chat', {
         
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` ${token}`,
          },
        });
        

        if (response) {
          console.log(response)
          setchats(response.data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const token = localStorage.getItem('authToken');

    fetchUsers(token);
   
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    
    navigate('/login');
  };

  return (
    <div className='Sidebar'>
      <div className='sidebar-headers'>
        <div>
        <Tooltip title="profile" arrow>
          <IconButton onClick={()=>navigate('welcome')}>
            <AccountCircleIcon />
          </IconButton>
          </Tooltip>
        </div>
        <div>
        <Tooltip title="users" arrow>
          <IconButton onClick={() => navigate('users')}>
            <PersonAddIcon />
          </IconButton>
          </Tooltip>
          <Tooltip title="grops" arrow>
          <IconButton onClick={() => navigate('groups')}>
            <GroupAddIcon />
          </IconButton>
          </Tooltip>
          <Tooltip title="creategroup" arrow>
          <IconButton onClick={() => navigate('creategroup')}>
            <AddCircleIcon />
          </IconButton>
          </Tooltip>
          {/* <IconButton>
            <NightlightIcon />
          </IconButton> */}
          <Tooltip title="Logout" arrow>
            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {/* <div className='sidebar-search'>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input placeholder='search' className='search-box' />
      </div> */}
      <div className='sidebar-messages'>
      {chats.length > 0 ? (
  chats.map((chat) => (
    <Conversations chat={chat} key={chat._id} setflag={setflag} />
  ))
) : (
  <p>No chats available</p>
)}

      </div>
    </div>
  );
}

export default Sidebar;
