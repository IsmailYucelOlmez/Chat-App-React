import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RoomPage = ({isAuth,room,setRoom}) => {

  const navigate=useNavigate();

  

  const joinCath=()=>{

    if(isAuth && room!=""){
    	
      navigate('/chat');
    }
  }


  return (   
    <div className='room-field'>
          
      <input type="text"  onChange={(e)=>setRoom(e.target.value)} placeholder='Enter a Room' />   

      <button onClick={()=>joinCath()}><i className="fa-solid fa-comment"></i>Start Chat</button>
      
    </div>
    
    
  )
}

export default RoomPage
