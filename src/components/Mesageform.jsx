

import React, { useEffect, useRef, useState } from 'react';
import './Component.css';
import Chatselected from './Chatselected';
import useSidebarStore from '../Zustand/Zustandstate';
import Message from './Message';
import Sendmessage from '../hooks/Sendmessage';
import Spinner from 'react-bootstrap/Spinner';
import 'react-loading-skeleton/dist/skeleton.css';
import Getmessage from '../hooks/Getmessage';
import { useSocketContext } from '../Context/SocketContext';
import Listeningmessage from '../hooks/Listeningmessage';

const MessageForm = () => {
  const [message, setMessage] = useState('');
  const { selectuser, setselectuser } = useSidebarStore();
  const { usersendmessage, loading } = Sendmessage();
  const { loadings, allmessages } = Getmessage();
  const lastMsgRef = useRef();
  const { onlineUsers } = useSocketContext();
  
  
    Listeningmessage(); 


  console.log('allmessages', allmessages);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await usersendmessage(message);
    setMessage('');
  };

  useEffect(() => {
    return () => setselectuser(null);
  }, []);

  useEffect(()=>{
    setTimeout(()=>{
      lastMsgRef.current?.scrollIntoView({behavior:'smooth'})
    },100)
  })

   
  return (
    <>
      {!selectuser ? (
        <Chatselected />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='message-container'>
            <div className='chat-reciever justify-content-start'>
              <p className='chat-reciever-name d-flex'>
                <img className='chat-recieverimg' src={selectuser.picture} alt='' /> {selectuser.username} {onlineUsers.includes(selectuser._id)? <p className='text-success bold'> <i class="fa-brands fa-creative-commons-by fa-fade" style={{color:'#00751d'}}></i>Online</p>: null}
              </p>
            </div>
            <div className='message-screen'>
              {allmessages.length === 0 && !loadings ? (
                <p className='text-center'>No messages yet! start a conversation</p>
              ) : (
                allmessages.map((msg) => (
                  <div key={msg._id} ref={lastMsgRef} className='send-message justify-content-end'>
                    <Message msg={msg} />
                  </div>
                ))
              )}
            </div>
            <div className='message-btn'>
              <input className='messageinput' type='text' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='type your message' />
              <button type='submit' className=''>
                {loading ? (
                  <Spinner animation='border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                  </Spinner>
                ) : (
                  <i className='fa-regular fa-paper-plane'></i>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default MessageForm;

