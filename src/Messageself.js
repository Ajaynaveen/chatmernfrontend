import React from 'react';

function Messageself({ text, sender,timestamp }) {
  console.log({sender})
  return (
    <div className='self-message-container'>
      <div className='message-box'>
        <p>{text}</p>
        <p>{sender}</p>
        <div className='self-timestamp'>{timestamp}</div>
      </div>
    </div>
  );
}

export default Messageself;
