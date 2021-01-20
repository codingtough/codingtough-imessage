import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import { auth, provider } from '../Firebase';

function Login() {

   const signIn = () => {
      auth
         .signInWithPopup(provider)
         .catch(error => alert(error.message))
   }

   return (
      <div className="login">
         <div className="login__logo">
            <img 
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IMessage_logo.svg/234px-IMessage_logo.svg.png" 
               alt="iMessage"
            />
            <h1>iMessage</h1>
         </div>
         <Button onClick={signIn}>Sign In</Button>
      </div>
   )
}

export default Login;
