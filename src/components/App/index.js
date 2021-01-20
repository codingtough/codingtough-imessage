import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from '../../features/userSlice';
import Imessage from '../Imessage';
import Login from '../Login';
import './App.css';
import { auth } from '../Firebase';

function App() {
   const user = useSelector(selectUser);
   const dispatch = useDispatch();

   useEffect(() => {
      auth
         .onAuthStateChanged(authUser => {
            if(authUser){
               //user logged in
               dispatch(login({
                  uid: authUser.uid,
                  photo: authUser.photoURL,
                  email: authUser.email,
                  displayName: authUser.displayName
               }));

            } else {
               //user logged out
               dispatch(logout());
            }
         })
   }, [dispatch]);

   return (
      <div className="app">
         {user ? (
            <Imessage />
         ) : (
            <Login />
         )}
      </div>
   );
}

export default App;
