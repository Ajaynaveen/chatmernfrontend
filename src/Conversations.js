import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Conversations({ chat, setflag }) {
  const [currentuser, setcurrentuser] = useState('');
  const navigate = useNavigate();
  let user, name;

  console.log(chat)

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
        setcurrentuser(response.data);
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  const receiver = chat.users.filter((user) => user._id !== currentuser._id);

  user = receiver.length > 0 ? receiver[0] : null;
  name = user ? user.name : '';
  if(chat.isGroupChat){
    user=chat
  }
  else{
    user=user

  }

  return (
    <div
      onClick={() => {
        setflag((prevflag) => !prevflag);
        navigate(`/app/chat/${chat._id}`, { state: { user } });
      }}
      className='conversation-container'
    >
      {!chat.isGroupChat && chat.latestMessage.sender ? (
        <>
          <p className='con-icon'>{name ? name[0] : ''}</p>
          <p className='con-name'>{name ? name : ''}</p>

        {chat.latestMessage.text.length>0? <p className='con-text'>{chat.latestMessage.text}</p>:''}  
          <p className='con-timestamp'>{new Date(chat.latestMessage.createdAt).toLocaleString()}</p>
        </>
      ) : null}




{chat.isGroupChat && chat.chatName ? (
      <>
        <p className='con-icon'>{chat.chatName[0]}</p>
        <p className='con-name'>{chat.chatName}</p>
        <p className='con-text'>{chat.latestMessage.text}</p>
        <p className='con-timestamp'>{new Date(chat.latestMessage.createdAt).toLocaleString()}</p>
      </>
    ) : null}


    
    </div>
  );
}

export default Conversations;
