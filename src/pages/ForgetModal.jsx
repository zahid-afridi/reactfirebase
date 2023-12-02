import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'; // Import the styles
  import API_URL from '../Axios/Axios';
export default function ForgetModal({ isOpen, closeModal }) {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState({
    email: '',
  });
const closeModal2=()=>{
  setSuccess(false)
}
const handleChange = (e) => {
  setEmail({
    ...email,
    [e.target.name]: e.target.value,
  });
};

// Store email in localStorage when submitting the form
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(API_URL+ 'password/forgot-password', email);
    const responseData = response.data;
    console.log(responseData);

    localStorage.setItem("userEmail", email.email);
    
    if (responseData.success) {
       toast.success(responseData.message, {
      position: "top-right", // Set the toast position
      autoClose: 2000, // Close the toast after 2000 milliseconds (2 seconds)
      hideProgressBar: false, // Show the progress bar
      closeOnClick: true, // Close the toast when clicked
      pauseOnHover: true, // Pause the timer when hovering over the toast
      draggable: true, // Allow dragging to dismiss the toast
      progress: undefined, // Use the default progress bar
    });
      setSuccess(true);
      console.log(responseData);
    }else{
       console.error("Login Error:", responseData.message);

      // Display an error toast with the API error message
      toast.error(responseData.message || "Invalid email or password", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    console.error("API Request Error:", error);

    // Display an error toast with the Axios error message
    toast.error(
      error.response?.data?.message || "An error occurred. Please try again later.",
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }
};


  // Re-enter password and OTP
  const [reenter, setReenter] = useState({
    password: '',
    otp: '',
  });

  const newpassword = (e) => {
    setReenter({
      ...reenter,
      [e.target.name]: e.target.value,
    });
  };

  const submitNewPassword = async (e) => {
  e.preventDefault();

  try {
    const storedEmail = localStorage.getItem("userEmail");
    const requestData = { ...reenter, email: storedEmail };
    console.log('Request Data:', requestData);

    const newp = await axios.post(API_URL + 'password/reset-password', requestData);
    const newdata = newp.data;
    console.log(newdata);

    if (newdata.success) {
       toast.success(newdata.message, {
      position: "top-right", // Set the toast position
      autoClose: 2000, // Close the toast after 2000 milliseconds (2 seconds)
      hideProgressBar: false, // Show the progress bar
      closeOnClick: true, // Close the toast when clicked
      pauseOnHover: true, // Pause the timer when hovering over the toast
      draggable: true, // Allow dragging to dismiss the toast
      progress: undefined, // Use the default progress bar
    });
      console.log(newdata)
      
      setSuccess(false)
      navigate('/login');
    } else {
  console.error("Login Error:", responseData.message);

      // Display an error toast with the API error message
      toast.error(responseData.message || "Invalid email or password", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
       toast.error(
      error.response?.data?.message || "An error occurred. Please try again later.",
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }
};

  return (
    <>
    <ToastContainer></ToastContainer>
      {isOpen && (
        <form action="" onSubmit={handleSubmit}>
          <div className="forget_modal">
            <i className="fa-solid fa-x" onClick={closeModal}></i>
            <div className="content">
              <h1>Forget Password</h1>
              <input
                type="email"
                name="email"
                value={email.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      )}

      {/* Re-enter password */}
      {success && (
        <form action="" onSubmit={submitNewPassword}>
          <div className="forget_modal">
            <i className="fa-solid fa-x" onClick={closeModal2}></i>
            <div className="content">
              <h1>Reset Password</h1>
              <input
                type="password"
                name="password"
                value={reenter.password}
                onChange={newpassword}
                placeholder="Enter new password"
              />
              <input
                type="text"
                name="otp"
                value={reenter.otp}
                onChange={newpassword}
                placeholder="Enter OTP"
              />
            </div>
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
}
