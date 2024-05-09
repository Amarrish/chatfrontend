import React, { useContext } from 'react'
import './Component.css'
import { userdataContext } from '../Context/Contextshare';
const Chatselected = () => {
  const { userdata } = useContext(userdataContext);
  // console.log(userdata);
  return (
    <div className='chatselect-container'>
      <h1><span className='text-success bold'>Welcome {userdata?.username || 'Hey bob'}</span></h1>
        <p>Please Select a Person and Start your Chat...</p>
        <i class="fa-regular fa-message"></i>
        <h1>Let's Start your Message here...</h1>
    </div>
  )
}

export default Chatselected