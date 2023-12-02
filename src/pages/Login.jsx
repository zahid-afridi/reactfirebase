import React, { useState, useEffect } from "react";
import { auth, googleProvider, githubProvider, facebookProvider } from "./Confiq";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import API_URL from "../Axios/Axios";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import ForgetModal from "./ForgetModal";

export default function Login() {
  const [invalue, setinvalue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
  
      navigate("/");
    }
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider);
      handleLoginResponse(data);
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const data = await signInWithPopup(auth, githubProvider);
      handleLoginResponse(data);
    } catch (error) {
      console.error("GitHub Login Error:", error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const data = await signInWithPopup(auth, facebookProvider);
      handleLoginResponse(data);
    } catch (error) {
      console.error("Facebook Login Error:", error.message);
    }
  };

  const handleLoginResponse = async (data) => {
    try {
      const accessToken = await data.user.getIdToken();

      // Include the access token in the user object
      data.user.accessToken = accessToken;

      // Save the user data to local storage
      localStorage.setItem("user", JSON.stringify(data.user));

      // Show a styled success toast notification
      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Delay the navigation for a short period (e.g., 2000 milliseconds)
      navigate("/");
    } catch (error) {
      console.error("Error getting user token:", error.message);
    }
  };

  const handlechange = (e) => {
    setinvalue((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handlesumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_URL + "login",
        invalue
      );

      const responseData = response.data;

      if (responseData.success) {
        const userId = responseData.data.user.id;
        console.log(userId);
        localStorage.setItem("userId", userId);
       
        toast.success(responseData.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        const user = responseData.data.user;
        const accessToken = responseData.accessToken;

        // Include the access token in the user object
        user.accessToken = accessToken;

        // Save the user data to local storage
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user);

        navigate('/');
      } else {
        console.error("Login Error:", responseData.message);
        toast.error(responseData.message || "Login failed", {
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

  const handleforget = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <ToastContainer position="right" autoClose={2000} hideProgressBar={false} pauseOnHover={true} draggable={true}></ToastContainer>
      <ForgetModal isOpen={modal} closeModal={closeModal}></ForgetModal>

      <div className="container " style={{ marginTop: '100px' }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handlesumbit}>
              <label className="form-label" htmlFor="form2Example1">
                Email address
              </label>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form2Example1"
                  className="form-control"
                  placeholder="Email address"
                  name="email"
                  value={invalue.email}
                  onChange={handlechange}
                />
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form2Example2"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={invalue.password}
                  onChange={handlechange}
                />
              </div>

              <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="form2Example31"
                      checked
                    />
                    <label className="form-check-label" htmlFor="form2Example31">
                      Remember me
                    </label>
                  </div>
                </div>

                <div className="col">
                  <Link to="" onClick={handleforget}>
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign in
              </button>

              <div className="text-center">
                <p>
                  Not a member?{" "}
                  <Link to="/register">
                    <span style={{ color: "blue" }}>Register</span>
                  </Link>
                </p>
              </div>

              <div className="text-center">
                <p>or sign up with:</p>
                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                  onClick={handleFacebookLogin}
                >
                  <i className="fab fa-facebook-f"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                  onClick={handleGoogleLogin}
                >
                  <i className="fab fa-google"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                  onClick={handleGitHubLogin}
                >
                  <i className="fab fa-github"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}