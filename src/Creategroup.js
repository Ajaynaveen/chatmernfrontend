import React, { useState } from 'react';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { IconButton } from '@mui/material';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import axios from 'axios'; // Correct the import statement
import { useNavigate } from 'react-router-dom';

const Creategroup = () => {
  const navigate=useNavigate()
  const [groupname, setGroupname] = useState('');

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('authToken');
      console.log(token);

     
      const response = await axios.post('https://chatmernbackend.onrender.com/chat/creategroup', {
        groupname: groupname
      }, {
        headers: {
          Authorization: `${token}` 
        }
      });

     
      console.log(response.data);
      navigate(`/app/groups`)
    } catch (error) {
      
      console.error(error);
    }
  };

  return (
    <div className='creategroup-container'>
      <input
        placeholder='enter the group name'
        className='search-box'
        name='groupname'
        value={groupname}
        onChange={(e) => setGroupname(e.target.value)}
      />
      <IconButton onClick={handleSubmit}><DoneOutlineOutlinedIcon /></IconButton>
    </div>
  );
};

export default Creategroup;
