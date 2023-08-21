import { useContext, useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RoomPage from './pages/RoomPage'
import ChatPage from './pages/ChatPage'


function App() {

  const [isAuth,setIsAuth]=useState(false);
  const [room,setRoom]=useState("");

  return (
    <div id='App'>
      <header> 
        <h1>ChatsApp</h1>
      </header>
        
        <Routes>
          <Route path='/' element={<LoginPage isAuth={isAuth} setIsAuth={setIsAuth}/>}/>

          <Route path='/room' element={isAuth ? <RoomPage isAuth={isAuth} room={room} setRoom={setRoom} />:
          <div className='login-error-field'> <a href="/"><i class="fa-solid fa-arrow-left"></i></a> giriş yapmalısınız </div>}/>

          <Route path='/chat' element={<ChatPage room={room} setIsAuth={setIsAuth}/>}/>
        </Routes>

    </div>
  )
}

export default App
