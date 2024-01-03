import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Showgroup({ group,onDelete }) {
  const [currentuser, setCurrentuser] = useState('');
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    fetchUserDetails(authToken);
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get('https://chatmernbackend.onrender.com/user/details', {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.data) {
        setCurrentuser(response.data);
        // Set the initial value based on user and group data
        const newValue = group.groupAdmin === response.data._id ? 'delete' : group.users.includes(response.data._id) ? 'Remove' : 'add';
        setValue(newValue);
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  const handlemessage = async (id) => {
    const token = localStorage.getItem('authToken');
    if (value === 'add') {
      try {
        const response = await axios.patch(`https://chatmernbackend.onrender.com/chat/addusers/${id}`, null, {
          headers: {
            Authorization: `${token}`,
          },
        });

        console.log(response.data);
        window.location.reload();
      } catch (error) {
        console.error('Error adding users to the group:', error);
      }
    } else if (value === 'Remove') {
      try {
        const response = await axios.patch(`https://chatmernbackend.onrender.com/chat/removeusers/${id}`, null, {
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log(response);
      setValue("add")
      } catch (error) {
        console.error('Error removing users from the group:', error);
      }
    } else {
        try {
            const response = await axios.delete(`https://chatmernbackend.onrender.com/chat/deletegroup/${id}`, {
              headers: {
                Authorization: `${token}`,
              },
            });
            console.log(response)
            onDelete(id);
        //  navigate(`/app/welcome`)
          } catch (error) {
            console.error('Error removing users from the group:', error);
          }
     
    }
  };

  if (!group || !group._id) {
    // Handle the case when group is undefined or _id is not available
    return null; // or some default content
  }
let user=group
  return (
    <div key={group._id} className='list-item' onClick={()=>{
        navigate(`/app/chat/${group._id}`, { state: { user} });
    }}>
      <p className='con-icon'>{group.chatName[0]}</p>
      <p className='con-name'>{group.chatName}</p>
      <button className='button' onClick={() => handlemessage(group._id)}>{value}</button>
    </div>
  );
}

export default Showgroup;
