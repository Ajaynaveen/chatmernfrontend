import React from 'react'
import './mystyles.css'
import Sidebar from './Sidebar';
import { useState } from 'react';
import Welcome from './Welcome';
import Creategroup from './Creategroup';
import User_group from './User_group';
import { Outlet } from 'react-router-dom';

// import Chatarea from './Chatarea'
function Maincontainer() {
    
  return (
    <div className='Maincontainer'>
         <Sidebar />
        <Outlet/>

       

  

       
       
    </div>

  )
}

export default Maincontainer;