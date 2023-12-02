// App.js

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin/pages/Admin";
import Notification from "./Notification/Notification";
import SendNotification from "./Admin/pages/SendNotification";

export default function App() {
  // useEffect(() => {
  //   // Request permission and retrieve token when the component mounts
   

  //   // Set up the message listener
  //   const unsubscribePromise = onMessageListener().then((payload) => {
  //     // Handle the received payload, e.g., display a notification
  //     // Display the message in a toast notification
  //     toast(`New message: ${payload.notification.body}`, { type: 'info' });

  //     // Return a function to unsubscribe when the component unmounts
  //     // return () => unsubscribePromise.then((unsubscribe) => unsubscribe());
  //   });

  //   return () => {
  //     // Perform cleanup when the component unmounts
  //     unsubscribePromise.then((unsubscribe) => unsubscribe());
  //   };
  // }, []); // Empty dependency array to ensure this effect runs only once
  // // useEffect(() => {
  // //   // Use the Notification component to handle push notifications
  // // }, []);

  // requestPermission()

  return (
    <>
      <BrowserRouter>
       <Notification></Notification>
        {/* <ToastContainer></ToastContainer> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/sendNotficaiton" element={<SendNotification></SendNotification>} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
