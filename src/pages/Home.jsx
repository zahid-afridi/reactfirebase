import React, { useEffect } from "react";
import { auth } from "./Confiq";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../Axios/Axios";
import Notification from "../Notification/Notification";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in or not
    const userString = localStorage.getItem("user");
    const loginUser = JSON.parse(userString);
         
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user && !loginUser) {

        
        navigate("/login");
      } else {
        try {
          const token = await user.getIdToken();
          // console.log("User Token:", token);
                    console.log(user)
          // Add the access token to the user object
          user.accessToken = token;
        } catch (error) {
          console.error("Error getting user token:", error.message);
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const logout = async () => {
    try {
      // Sign out from Firebase authentication
      await signOut(auth);

      // Remove user data from local storage
      localStorage.removeItem("user");
      localStorage.removeItem('userId');

      // Display a success toast
      toast.success("Logout successful", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Navigate to the login page
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);

      // Display an error toast
      toast.error("Logout failed. Please try again.", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Notification />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      ></ToastContainer>
      <div className="container " style={{marginTop:'100px',marginLeft:'250px'}}>
        {user && (
          <div className="container">
            <h2>Welcome, {user.displayName || user.email}!</h2>
            <p>Email: {user.email}</p>
            {user.displayName && <p>Display Name: {user.displayName}</p>}
            {user.providerData && user.providerData.length > 0 && (
              <p>Provider: {user.providerData[0].providerId}</p>
            )}
            <button className="btn btn-primary w-25" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
