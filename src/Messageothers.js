import React from 'react';

function Messageothers({ name, text,sender, timestamp }) {
  console.log({sender})
  return (
    <div className='other-message-container'>
      <div className='conversation-messagecontainer'>
      
        <div className='other-text-content'>
          <p className='con-name'>{name}</p>
          <p className='con-lastmsg'>{text}</p>
          <p>{sender}</p>
          <div className='self-timestamp'>{timestamp}</div>
        </div>
      </div>
    </div>
  );
}

export default Messageothers;
