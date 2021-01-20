import React, { useEffect, useRef, useState } from 'react';
import { IconButton } from '@material-ui/core';
import MicNoneIcon from '@material-ui/icons/MicNone';
import './Chat.css';
import Message from '../Message';
import { useSelector } from 'react-redux';
import { selectChatName, selectChatId } from '../../features/chatSlice';
import { selectUser } from '../../features/userSlice';
import db from '../Firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';

function Chat() {
   const [input, setInput] = useState("");
   const [messages, setMessages] = useState([])

   const user = useSelector(selectUser);
   const chatName = useSelector(selectChatName);
   const chatId = useSelector(selectChatId);

   const messagesEndRef = useRef(null)

   const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
   }

   useEffect(scrollToBottom, [messages]);

   useEffect(() => {
      if(chatId){
         db.collection("chats")
            .doc(chatId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot(snapshot => (
               setMessages(snapshot.docs.map(doc => ({
                     id: doc.id,
                     data: doc.data()
                  }))
               )
            ))
      }
   }, [chatId]);
   
   const sendMessage = e => {
      e.preventDefault();
      db.collection("chats")
         .doc(chatId)
         .collection("messages")
         .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName
         });
      
      setInput("");
   }
   
   return (
      <div className="chat">
         <div className="chat__header">
            <h4>To: <span className="chat__name">{chatName}</span></h4>
            <strong>details</strong>
         </div>
         <div className="chat__messages">
            <FlipMove>
               {messages.map(({id, data}) => (
                  <Message key={id} contents={data} />
               ))}
            </FlipMove>
            <div ref={messagesEndRef} />
         </div>
         <div className="chat__input">
            <form>
               <input 
                  value={input}
                  disabled={chatId}
                  onChange={e => setInput(e.target.value)}
                  placeholder="iMessage"
               />
               <button onClick={sendMessage}>Send Message</button>
            </form>
            <IconButton>
               <MicNoneIcon fontSize="large" className="chat__mic" />
            </IconButton>
         </div>
      </div>
   )
}

export default Chat;
