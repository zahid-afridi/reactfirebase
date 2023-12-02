import React, { useEffect } from 'react';
import Pusher from 'pusher-js';
import { ToastContainer,toast } from 'react-toastify';

export default function Notification() {
  useEffect(() => {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = false;
   
    const pusher = new Pusher('0c34fd45ae0554aad4cf', {
      cluster: 'ap2',
    });
  const loggedInUserId = localStorage.getItem('userId');
  const channel = pusher.subscribe('my-channel');
  channel.bind('my-event', function (data) {
    
    const test = JSON.stringify(data);
    
    const MessageUserId=(JSON.stringify(data.userId))
      if (MessageUserId===loggedInUserId) {
      //  toast.success((JSON.stringify(data))+loggedInUserId)\
      alert((JSON.stringify(data.message)))

        
      }
    //   alert(JSON.stringify(data));
    
      
  });

    
    // Clean up the subscription when the component unmounts
    return () => {
      channel.unbind(); // Unbind the event
      pusher.unsubscribe('my-channel'); // Unsubscribe from the channel
    };
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <>
      <ToastContainer position='top-right' autoClose="2000" 
            closeOnClick={true} pauseOnHover={true} draggable={true} ></ToastContainer></>
  );
}
