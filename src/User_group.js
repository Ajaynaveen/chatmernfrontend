import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import logo from './Images/livechatapp.jpeg';
import axios from 'axios';
import Showgroup from './Showgroup';

function User_group() {
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const deleteGroup = (groupId) => {
    setGroups((prevGroups) => prevGroups.filter((group) => group._id !== groupId));
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('https://chatmernbackend.onrender.com/chat/groups', {
          headers: {
            Authorization: ` ${token}`,
          },
        });
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredGroups = groups.filter((group) =>
    group.chatName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='list-container'>
      <div className='ug-header'>
        <img src={logo} alt='profile' style={{ height: '38px', width: '38px', marginLeft: '20px' }} />
        <p className='ug-title'>online groups</p>
      </div>
      <div className='sidebar-search'>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input
          placeholder='search'
          className='search-box'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className='ug-list'>
        {filteredGroups.map((group) => (
          <Showgroup key={group._id} group={group} onDelete={deleteGroup} />
        ))}
      </div>
    </div>
  );
}

export default User_group;
