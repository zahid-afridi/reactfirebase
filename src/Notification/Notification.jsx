import React, { useEffect } from 'react';
import Pusher from 'pusher-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notification() {
  useEffect(() => {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = false;

    const pusher = new Pusher('0c34fd45ae0554aad4cf', {
      cluster: 'ap2',
    });

    const loggedInUserId = localStorage.getItem('userId');
    // console.log(loggedInUserId)
    const channel = pusher.subscribe('my-channel');

    channel.bind('my-event', function (data) {
      const MessageUserId = JSON.stringify(data.userId);
      if (MessageUserId === loggedInUserId) {
        // Dismiss all previous toasts before showing a new one
        toast.dismiss();
        
        // Show a new toast
        toast.success(JSON.stringify(data.message), {
          position: 'top-right',
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
      }
    });

    // Clean up the subscription when the component unmounts
    return () => {
      channel.unbind(); // Unbind the event
      pusher.unsubscribe('my-channel'); // Unsubscribe from the channel
    };
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      ></ToastContainer>
    </>
  );
}
