import React, { useState,useEffect, useRef } from 'react'
import {addDoc, collection,serverTimestamp,where,onSnapshot, query,orderBy} from 'firebase/firestore'
import {auth, database } from '../firebase/FirebaseConfig';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const cookie=new Cookies();


const ChatPage = ({room,setIsAuth}) => {

  const navigate=useNavigate();

  const [hide,setHide]=useState(true);
 

  const timezoneTurkey = { timeZone: 'Europe/Istanbul' };

  const [message,setMessage]=useState("");
  const messageRef=collection(database,'messages');
  const [messages,setMessages]=useState([]);

  const encodedValue = cookie.get("username");
  const convertedUsername = decodeURIComponent(encodedValue.replace(/\+/g, ' '));

  
  

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
     
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);


  const sendMessage=async()=>{

    if(message!=""){

      await addDoc(messageRef, {
        text: message,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room,
      });
  
      setMessage("");


    }
  }

  const logout=async()=>{
    await signOut(auth);
    cookie.remove("auth-token");
    cookie.remove('username');
    setIsAuth(false);
    navigate('/');
    
  }

  const convertedDate=(stamp)=>{

    const date=new Date(stamp);
    const h="0"+date.getHours();
    const d="0"+date.getMinutes();
    const converted=h.substring(-2)+":"+d.substring(-2);
    return converted;
  }

  const chatRef=useRef(null);

  const scrollBottom=() => {
   
    chatRef.current?.scrollTo({
      top: chatRef.current?.scrollHeight,
      behavior: 'smooth',
  });
  }

  useEffect(()=>{

    scrollBottom();

  },[messages])


  return (
    <div className='chat-side'>


    <div className='scrollbottom-field'>
      <button onClick={()=>scrollBottom()}> <i className="fa-solid fa-arrow-down"></i> </button>
    </div>
    

    <div className='chat-side-header'>
      <div className='chat-side-header-user-info'>
        
        <h3>{room}</h3>
        <h6>{auth.currentUser.displayName}</h6>
      </div>
   
      <div className='chat-side-header-buttons'>
      <button className='logout-btn' onClick={logout}> <i className="fa-solid fa-right-from-bracket"></i>  </button> 
      
      </div>
  
    </div>
    <div ref={chatRef} className='chat-field'>

    

      {messages.map((msg)=>(

         msg.user==convertedUsername ?(

         <div key={msg.id} className='message my-message'>

           <div className='message-text my-message-text'>
             
             <p>{msg.text}</p>
             <p className='message-time-text'>{msg.createdAt?.toDate().toLocaleTimeString('tr-TR', timezoneTurkey)}</p>
 
           </div>
         </div>
        ):(
          <div key={msg.id} className='message other-message'>
     
          <div className='message-text other-message-text'>
            <p className='message-user-text'>{msg.user}</p>
            <p>{msg.text}</p>
            <p className='message-time-text'>{msg.createdAt?.toDate().toLocaleTimeString('tr-TR', timezoneTurkey)}</p>
 
            
          </div>
        </div>
        )
        


      ))}
      

    </div>
    <div className='chat-input-field'>
      <input type='text' id='chat-text-input' onKeyDown={(event)=>{if(event.key=="Enter") document.querySelector('.send-button').click()}} value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Write something...'/>

      <button className='send-button' onClick={()=>sendMessage()}><i className="fa-brands fa-telegram"></i></button>
    </div>

  </div>
  )
}

export default ChatPage
