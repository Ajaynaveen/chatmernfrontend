// import { IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
// import React from 'react'
// import Messageothers from './Messageothers';
// import Messageself from './Messageself';
// import { useState } from 'react';

// function Chatarea() {
//   const [conversations,setconversations]=useState([
//     {
//         name:"ajay",
//     lastmessage:"test1",
//     timestamp:"today",


//     },
//     {
//         name:"naveen",
//     lastmessage:"test3",
//     timestamp:"today,"


//     },
//     {
//         name:"tamil",
//     lastmessage:"test2",
//     timestamp:"today,"


//     }
// ])
// var props=conversations[0];
//   return (
//     <div className='chatarea-container'>

//         <div className='chatarea-header'>
//         <p className='con-icon'>{props.name[0]}</p>
//         <div className='header-text'>
//             <p className='con-name'>{props.name}</p>
//             <p className='con-timestamp'>{props.timestamp}</p>

//         </div>

//         <IconButton>
//             <DeleteIcon/>
//         </IconButton>
//         </div>
//         <div className='message-container'>
//             <Messageothers/>
//             <Messageself/>
//             <Messageothers/>
//             <Messageself/>
//             <Messageothers/>
//             <Messageothers/>
//             <Messageself/>
//             <Messageothers/>
//             <Messageself/>
//             <Messageothers/>
         
            
//         </div>
//         <div className='text-input-area'>
//         <input placeholder='type a message' className='search-box'/>
// <IconButton>
// <SendIcon/>
// </IconButton>

//         </div>
    
//     </div>
//   )
// }

// export default Chatarea;


import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Messageothers from './Messageothers';
import Messageself from './Messageself';

function Chatarea() {
  const [flag, setFlag] = useState(false);
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { state } = useLocation();
  const { user } = state || {};
  console.log(user)
  

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`https://chatmernbackend.onrender.com/message/${chatId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    console.log(messages)
  
    fetchMessages();
  }, [chatId, flag]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };
  console.log(messages)

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(
        'https://chatmernbackend.onrender.com/message',
        {
          text: newMessage,
          chatId: chatId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        }
      );
      window.location.reload();
      
  
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
 
  
  
    return (
      <div className='chatarea-container'>
        <div className='chatarea-header'>
          <p className='con-icon'>{user.chatName ? user.chatName[0] : user?.name ? user.name[0] : ''}</p>
          <div className='header-text'>
            <p className='con-name'>{user.chatName ? user.chatName : user?.name}</p>
            {/* <p className='con-timestamp'>{chatHeaderInfo.timestamp}</p> */}
          </div>
        </div>
        <div className='message-container'>

          {messages.map((message) => {
            console.log(message)
            if (!user.isGroupChat) {
              return message.sender=== user._id ? (
                <Messageothers
                  key={message._id}
                  text={message.text}
                  timestamp={new Date(message.createdAt).toLocaleString()}
                />
              ) : (
                <Messageself
                  key={message._id}
                  text={message.text}
                  timestamp={new Date(message.createdAt).toLocaleString()}
                />
              );
            } else {
              return message.sender=== user._id ? (
                <Messageothers
                  key={message._id}
                  text={message.text}
                  sender={message.sender.name}
                  timestamp={new Date(message.createdAt).toLocaleString()}
                />
              ) : (
                <Messageself
                  key={message._id}
                  text={message.text}
                  sender={message.sender.name}
                  timestamp={new Date(message.createdAt).toLocaleString()}
                />
              );
            }
          })}
        </div>
        <div className='text-input-area'>
          <input
            placeholder='type a message'
            className='search-box'
            value={newMessage}
            onChange={handleInputChange}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    );
  }

export default Chatarea;
