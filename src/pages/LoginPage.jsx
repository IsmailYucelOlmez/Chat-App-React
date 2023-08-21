import React, { useContext } from 'react'
import { Link, json } from 'react-router-dom'
import {auth,provider} from '../firebase/FirebaseConfig.js'
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookie=new Cookies();

const LoginPage = ({setIsAuth,isAuth}) => {

    const navigate=useNavigate();


    const Login=async()=>{
      try{

        const result=await signInWithPopup(auth,provider);        
        cookie.set("auth-token", result.user.refreshToken);
        cookie.set("username",result.user.displayName)
        
        
        setIsAuth(true);          
        navigate("/room");

      }catch(err){
        console.error(err);
        
      }
    }

  return (
    <div className='login-field'>
       <button onClick={()=>Login()}><i className="fa-brands fa-google"></i>Sign In With Google</button>
    </div>
  )
}

export default LoginPage
